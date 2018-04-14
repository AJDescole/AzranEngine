"use strict";
var A = require('./avatar.js').Avatar;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

class Player extends A {
    constructor(library, animationfield, symbol) {
        super(library, animationfield, symbol);

        var p = this;
        window.addEventListener(
            "keydown",
            function(event) { p.onDown(event) },
            false
        );
        window.addEventListener(
            "keyup",
            function(event) { p.onUp(event) },
            false
        )
    }

    onDown(event) {
        this.keys[event.keyCode] = true;
    }

    onUp(event) {
        this.keys[event.keyCode] = false;
    }

}
exports.Player = Player;
