"use strict";
require('pixi.js');
require('pixi-animate');

let MovieClipFactory = function(library, animationfield, symbolfield) {
    let animations = library[animationfield];
    let symbol = animations[symbolfield];

    let MC = new PIXI.animate.MovieClip;

    let Commands = {
        // new symbol
        ns: function(obj, field, library, animationfield, symbolfield) {
            console.log("ns", field, animationfield, symbolfield);
            obj[field] = MovieClipFactory(library, animationfield, symbolfield);
            return obj;
        },
        // new graphics
        ng: function(obj, field, library, shapefield, index) {
            console.log("ng", field, index);
            obj[field] = (new PIXI.Graphics).d(library[shapefield][index]);
            return obj;
        },
        // add Timed Child
        at: function(obj, field, startFrame, duration, keyframes) {
            console.log("at", field, startFrame, duration, keyframes);
            return obj.at(obj[field], startFrame, duration, keyframes);
        },
        // add Child
        ac: function(obj, field) {
            console.log("ac", obj, field);
            return obj.ac(obj[field]);
        },
        // set Transform
        t: function(obj, x, y, scaleX, scaleY, skewX, skewY, pivotX, pivotY) {
            console.log("t", obj, x, y);
            return obj.t(x, y, scaleX, scaleY, skewX, skewY, pivotX, pivotY);
        }
    }

    for(let i in symbol) {
        let command = symbol[i];
        let c = command[0];
        let args = command.slice(1);
        if (c == "ns") {
            MC = Commands.ns(MC, args[0], library, animationfield, args[1]);
        } else if (c == "ng") {
            MC = Commands.ng(MC, args[0], library, args[1], args[2]);
        } else {
            MC = Commands[c](MC, ...args);
        }
    }

    return MC;
}

exports.MovieClipFactory = MovieClipFactory;
