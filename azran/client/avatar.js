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
        this.speed = 2;

        this.character = MCF(library, animationfield, symbol);
        this.setAnimation(this.animation);
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
        if (this.animation != label) {
            this.animation = label;
            this.character.gotoAndStop(label);
            this.onAnimationChange(label);
        }
    }

    onFrame(delta) {
        if (this.animation == "left") {
            this.x -= this.speed;
        } else if (this.animation == "right") {
            this.x += this.speed;
        } else if (this.animation == "up") {
            this.y -= this.speed;
        } else if (this.animation == "down") {
            this.y += this.speed;
        }
    }

    onAnimationChange(label) {

    }

    isDown(key) {
        return key in this.keys && this.keys[key];
    }
}
exports.Avatar = Avatar;
