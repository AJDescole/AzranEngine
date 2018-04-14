"use strict";
require('pixi.js');
require('pixi-animate');

var MC = PIXI.animate.MovieClip;
var A = require('./avatar.js').Avatar;
var P = require('./player.js').Player;

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

var Scene = MC.e(function() {
    MC.call(this);

    let s = new P(
        PIXI.animate.ShapesCache,
        "animations",
        "228"
    );

    s.x = 400;
    s.y = 400;
    this.ac(s);

    console.log("== AZRAN SCENE BUILT ==");
});

Scene.assets = {
    shapes: "azran.shapes.txt",
    animations: "azran.animations.json"
};

window.onload = function() {
    let app = new PIXI.animate.Scene(800, 800, {
        view: document.getElementById("stage"),
        backgroundColor: 0xFFFFFF,
        antialias: true
    }).load(Scene);
}
