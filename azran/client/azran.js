"use strict";
require('pixi.js');
require('pixi-animate');

var MovieClip = PIXI.animate.MovieClip;
var Client = require('./client.js').Client;

var MCF = require('./MovieClipFactory.js').MovieClipFactory;

let AnimationLoader = function()
{
    return function(resource, next)
    {
        let url = resource.url;
        let data = resource.data;

        if (data && url.search(/\animations\.json$/i) > -1) {
            PIXI.animate.ShapesCache.add(resource.name, data);
        }
        next();
    }
}
PIXI.loaders.Loader.addPixiMiddleware(AnimationLoader);

var Scene = MovieClip.e(function() {
    MovieClip.call(this);

    let bg = new PIXI.Sprite.fromImage("mt.jotapdur.background.png");
    bg.x -= 1700;
    bg.y -= 500;
    this.ac(bg);

    let client = new Client(this, PIXI.animate.ShapesCache, "animations", "228");

    let pet = MCF(PIXI.animate.ShapesCache, "pet_a", "main");

    this.ac(pet);

    pet.x = 600;
    pet.y = 600;

    client.connect("ws://localhost/azran_ws");
});

Scene.assets = {
    shapes: "azran.shapes.txt",
    animations: "azran.animations.json",
    pet: "pet.shapes.txt",
    pet_a: "pet.animations.json",
};

window.debug = document.location.href.indexOf("?debug") !== -1 || document.location.href.indexOf("&debug") !== -1;

window.onload = function() {
    let app = new PIXI.animate.Scene(window.innerWidth, window.innerHeight, {
        view: document.getElementById("stage"),
        backgroundColor: 0xA08A49,
        antialias: true
    }).load(Scene);
}
