"use strict";
require('pixi.js');
require('pixi-animate');
var MCF = require('./MovieClipFactory.js').MovieClipFactory;

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

class Avatar extends PIXI.animate.MovieClip {
    constructor(library, animationfield, symbol) {
        super();
        this.animations = ["inactive", "up", "down", "right", "left"];
        this.keys = {};
        this.speed = 3;


        this.character = MCF(library, animationfield, symbol);
        this.setAnimation(this.animations[0]);
        this.setGear(0);
        this.setHat(0);
        this.setFace("happy");

        this.addChild(this.character);

        var p = this;
        this.ticker = new PIXI.ticker.Ticker;
        this.ticker.add(function(delta) { p.onFrame(delta) });
        this.ticker.start();
    }

    setGear(label) {
        for(let i in this.animations) {
            let anim = this.animations[i];
            this.character[anim].body.gear.gotoAndStop(label);
        }
    }

    setHat(label) {
        for(let i in this.animations) {
            let anim = this.animations[i];
            this.character[anim].body.hat.gotoAndStop(label);
        }
    }

    setFace(label) {
        for(let i in ["inactive"]) {
            let anim = this.animations[i];
            this.character[anim].body.face.gotoAndStop(label);
        }
    }

    setAnimation(label) {
        this.character.gotoAndStop(label);
    }

    onFrame(delta) {
        if (this.isDown(LEFT)) {
            this.setAnimation("left");
            this.x -= this.speed;
        } else if (this.isDown(RIGHT)) {
            this.setAnimation("right");
            this.x += this.speed;
        } else if (this.isDown(UP)) {
            this.setAnimation("up");
            this.y -= this.speed;
        } else if (this.isDown(DOWN)) {
            this.setAnimation("down");
            this.y += this.speed;
        } else {
            this.setAnimation("inactive");
        }
    }

    isDown(key) {
        return key in this.keys && this.keys[key];
    }
}
exports.Avatar = Avatar;
