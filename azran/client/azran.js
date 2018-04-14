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

    let player = new P(
        PIXI.animate.ShapesCache,
        "animations",
        "228"
    );
    player.onDown = function(event) {
        if (!player.isDown(event.keyCode)) {
            ws.send(JSON.stringify(["sm", player.ID, event.keyCode, player.x, player.y]));
        }
    }
    player.onUp = function(event) {
        if (player.isDown(event.keyCode)) {
            ws.send(JSON.stringify(["em", player.ID, event.keyCode, player.x, player.y]));
        }
    }

    let characters = {};
    let scene = this;

    console.log("== AZRAN SCENE BUILT ==");

    let ws = new WebSocket("ws://localhost/azran_ws");

    ws.onopen = function(event) {
        console.log("connected");
        scene.ac(player);
        let hat = Math.floor(Math.random() * 23);
        let gear = Math.floor(Math.random() * 19);
        let ID = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        let x = Math.floor(Math.random() * 800);
        let y = Math.floor(Math.random() * 800);

        player.x = x;
        player.y = y;
        player.setHat(hat);
        player.setGear(gear);
        player.ID = ID;

        console.log(ID, gear, hat, x, y);

        ws.send(JSON.stringify(["join", ID, gear, hat, x, y]));
    }

    ws.onmessage = function(event) {
        let e = JSON.parse(event.data);
        let action = e[0];

        if (action == "join") {
            let ID = e[1];
            let char = new A(
                PIXI.animate.ShapesCache,
                "animations",
                "228"
            );
            char.setGear(e[2]);
            char.setHat(e[3]);
            char.x = e[4];
            char.y = e[5];
            char.ID = ID;

            characters[ID] = char;
            scene.ac(char);
        } else if (action == "sm" || action == "em") {
            let ID = e[1];
            let char = characters[ID];
            let key = e[2];

            char.x = e[3];
            char.y = e[4];
            char.keys[key] = (action == "sm");
        } else if (action == "quit") {
            let ID = e[1];
            let char = characters[ID];
            scene.removeChild(char);
            delete characters[ID];
        }
        console.log("received", event.data);
    }
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
