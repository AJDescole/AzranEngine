"use strict";
require('pixi.js');
require('pixi-animate');

function MCFLogger(...args)
{
    //console.log(...args);
}

let MovieClipFactory = function(library, animationfield, symbolfield, prefix = '#') {
    let animations = library[animationfield];
    let symbol = animations[symbolfield];

    let MC = new PIXI.animate.MovieClip;

    let Commands = {
        // build brand new movieclip
        b: function(options, duration, loop, framerate, labels) {
            MCFLogger(prefix, "b", options, duration, loop, framerate, labels);
            return new PIXI.animate.MovieClip(options, duration, loop, framerate, labels);
        },
        // new symbol
        ns: function(obj, field, library, animationfield, symbolfield) {
            MCFLogger(prefix, "ns", field, animationfield, symbolfield);
            obj[field] = MovieClipFactory(library, animationfield, symbolfield, prefix+"#");
            return obj;
        },
        // new graphics
        ng: function(obj, field, library, shapefield, index) {
            MCFLogger(prefix, "ng", field, shapefield, index);
            obj[field] = (new PIXI.Graphics).d(library[shapefield][index]);
            return obj;
        },
        // add Timed Child
        at: function(obj, field, startFrame, duration, keyframes) {
            MCFLogger(prefix, "at", field, startFrame, duration, keyframes);
            return obj.at(obj[field], startFrame, duration, keyframes);
        },
        // add Child
        ac: function(obj, ...fields) {
            MCFLogger(prefix, "ac", fields);
            for (let key in fields) {
                let field = fields[key];
                obj.ac(obj[field]);
            }
            return obj;
        },
        // set Transform
        t: function(obj, ...args) {
            MCFLogger(prefix, "t", args);
            return obj.t(...args);
        },
        // set Transform to subobject
        tf: function(obj, field, ...args) {
            MCFLogger(prefix, "tf", field, args);
            obj[field].t(...args);
            return obj;
        },
        gs: function(obj, label) {
            MCFLogger(prefix, "gs", label);
            obj.gotoAndStop(label);
            return obj;
        },
        // comments
        c: function(obj, ...data) {
            MCFLogger(prefix, "comments:", data);
            return obj;
        },
        // nullified
        n: function(obj, ...data) {
            MCFLogger(prefix, "nullified:", data);
            return obj;
        },

        // new graphics, add child and transform
        ngac: function(obj, library, shapefield, index, ...transform) {
            MCFLogger(prefix, "ngac", shapefield, index, transform);
            let graphics = (new PIXI.Graphics).d(library[shapefield][index]);
            if (transform.length > 0)
                graphics.t(...transform);
            obj.ac(graphics);
            return obj;
        },
        // new symbol, add child and transform
        nsac: function(obj, library, animationfield, symbolfield, ...transform) {
            MCFLogger(prefix, "nsac", animationfield, symbolfield, transform);
            let symbol = MovieClipFactory(library, animationfield, symbolfield);
            if (transform.length > 0)
                symbol.t(...transform);
            obj.ac(symbol);
            return obj;
        },
        // new graphics and add timed child
        ngat: function(obj, library, shapefield, index, ...args) {
            MCFLogger(prefix, "ngat", shapefield, index, args);
            let graphics = (new PIXI.Graphics).d(library[shapefield][index]);
            obj.at(graphics, ...args);
            return obj;
        },
        nsat: function(obj, library, animationfield, symbolfield, ...args) {
            MCFLogger(prefix, "nsat", animationfield, symbolfield, args);
            let symbol = MovieClipFactory(library, animationfield, symbolfield);
            obj.at(symbol, ...args);
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
        } else if (c == "nsac") {
            MC = Commands.nsac(MC, library, animationfield, ...args);
        } else if (c == "ngac") {
            MC = Commands.ngac(MC, library, ...args);
        } else if (c == "nsat") {
            MC = Commands.nsat(MC, library, animationfield, ...args);
        } else if (c == "ngat") {
            MC = Commands.ngat(MC, library, ...args);
        } else if (c == "b") {
            MC = Commands.b(...args);
        } else {
            MC = Commands[c](MC, ...args);
        }
    }

    return MC;
}

exports.MovieClipFactory = MovieClipFactory;
