"use strict";
require('pixi.js');
require('pixi-animate');

let MovieClipFactory = function(library, animationfield, symbolfield) {
    let animations = library[animationfield];
    let symbol = animations[symbolfield];

    let MC = new PIXI.animate.MovieClip;

    let Commands = {
        // build brand new movieclip
        b: function(options, duration, loop, framerate, labels) {
            return new PIXI.animate.MovieClip(options, duration, loop, framerate, labels);
        },
        // new symbol
        ns: function(obj, field, library, animationfield, symbolfield) {
            obj[field] = MovieClipFactory(library, animationfield, symbolfield);
            return obj;
        },
        // new graphics
        ng: function(obj, field, library, shapefield, index) {
            obj[field] = (new PIXI.Graphics).d(library[shapefield][index]);
            return obj;
        },
        // add Timed Child
        at: function(obj, field, startFrame, duration, keyframes) {
            return obj.at(obj[field], startFrame, duration, keyframes);
        },
        // add Child
        ac: function(obj, field) {
            obj.ac(obj[field]);
            return obj;
        },
        // set Transform
        t: function(obj, x, y, scaleX, scaleY, skewX, skewY, pivotX, pivotY) {
            return obj.t(x, y, scaleX, scaleY, skewX, skewY, pivotX, pivotY);
        },
        // set Transform to subobject
        tf: function(obj, field, x, y, scaleX, scaleY, skewX, skewY, pivotX, pivotY) {
            obj[field].t(x, y, scaleX, scaleY, skewX, skewY, pivotX, pivotY);
            return obj;
        },
        gs: function(obj, label) {
            obj.gotoAndStop(label);
            return obj;
        },
        // comments
        c: function(obj, ...data) {
            console.log(data);
            return obj;
        },
        // nullified
        n: function(obj, ...data) {
            return obj;
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
        } else if (c == "b") {
            MC = Commands.b(...args);
        } else {
            MC = Commands[c](MC, ...args);
        }
    }

    return MC;
}

exports.MovieClipFactory = MovieClipFactory;
