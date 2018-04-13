"use strict";
require('pixi.js');
require('pixi-animate');

var MC = PIXI.animate.MovieClip;
var G = PIXI.Graphics;

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
