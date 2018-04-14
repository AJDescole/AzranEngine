"use strict";
require('pixi.js');
require('pixi-animate');

var MC = PIXI.animate.MovieClip;
var G = PIXI.Graphics;

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
    console.log("== AZRAN SCENE BUILT ==");
});

window.onload = function() {
    new PIXI.animate.Scene(800, 800, {
        view: document.getElementById("stage"),
        backgroundColor: 0xFFFFFF,
        antialias: true
    }).load(Scene);
}
