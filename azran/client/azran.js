"use strict";
require('pixi.js');
require('pixi-animate');

var MovieClip = PIXI.animate.MovieClip;
var Client = require('./client.js').Client;

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

    let sprite = new PIXI.Sprite.fromImage("bg.png");
    sprite.x -= 600;
    this.ac(sprite);

    let client = new Client(this, PIXI.animate.ShapesCache, "animations", "228");

    client.connect("ws://localhost/azran_ws");
});

Scene.assets = {
    shapes: "azran.shapes.txt",
    animations: "azran.animations.json"
};

window.onload = function() {
    let app = new PIXI.animate.Scene(1200, 800, {
        view: document.getElementById("stage"),
        backgroundColor: 0xFFFFFF,
        antialias: true
    }).load(Scene);
}
