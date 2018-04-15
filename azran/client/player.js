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

    onFrame(delta) {
        super.onFrame(delta);

        if (this.isDown(LEFT)) {
            this.setAnimation("left");
        } else if (this.isDown(RIGHT)) {
            this.setAnimation("right");
        } else if (this.isDown(UP)) {
            this.setAnimation("up");
        } else if (this.isDown(DOWN)) {
            this.setAnimation("down");
        } else {
            this.setAnimation("inactive");
        }
    }

    onDown(event) {
    }

    onUp(event) {
    }

}
exports.Player = Player;
