"use strict";
var A = require('./avatar.js').Avatar;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

class Player extends A {
    constructor(library, animationfield, symbol) {
        super(library, animationfield, symbol);

        var p = this;
        window.addEventListener(
            "keydown",
            function(event) { p.onDown(event); p.keys[event.keyCode] = true; },
            false
        );
        window.addEventListener(
            "keyup",
            function(event) { p.onUp(event); p.keys[event.keyCode] = false; },
            false
        )
    }

    onDown(event) {
    }

    onUp(event) {
    }

}
exports.Player = Player;
