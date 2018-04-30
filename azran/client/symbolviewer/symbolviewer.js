"use strict";
require('pixi.js');
require('pixi-animate');

var MovieClip = PIXI.animate.MovieClip;
var MCF = require('../MovieClipFactory.js').MovieClipFactory;

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

var drag = false;
function createDragAndDropFor(target){
  target.interactive = true;
  target.drag = false;
  target.on("mousedown", function(e){
    target.drag = true;
  })
  target.on("mouseup", function(e){
    target.drag = false;
  })
  target.on("mousemove", function(e){
    if(target.drag){
      target.position.x += e.data.originalEvent.movementX;
      target.position.y += e.data.originalEvent.movementY;
    }
  })
}

var Scene = MovieClip.e(function() {
    MovieClip.call(this);
	let scene = this;

	this.symbol = null;
	this.bg = false;

	// populate #animationlibrary first
	for (let key in Scene.libraries) {
		let option = document.createElement('option');
		option.value = Scene.libraries[key];
		option.innerHTML = key;
		document.getElementById("animationlibrary").appendChild(option);
	};

	// populate #symbol when #animationlibrary value is updated
	document.getElementById("animationlibrary").onchange = function(event) {
		let animations = this.value;
		let symbolselect = document.getElementById("symbol");
		while (symbolselect.firstChild) {
			symbolselect.removeChild(symbolselect.firstChild);
		}

		for (let key in PIXI.animate.ShapesCache[animations]) {
			let option = document.createElement('option');
			option.value = key;
			option.innerHTML = key;
			symbolselect.appendChild(option);
		}
	};

	// display selected symbol
	document.getElementById("symbol").onchange = function(event) {
		if (scene.symbol != null) {
			scene.removeChild(scene.symbol);
			scene.symbol = null;
		}

		scene.symbol = MCF(
			PIXI.animate.ShapesCache,
			document.getElementById("animationlibrary").value,
			this.value
		);

		scene.symbol.x = window.innerWidth/2 - scene.symbol.width/2;
		scene.symbol.y = window.innerHeight/2 - scene.symbol.height/2;
		scene.symbol.scale.x = document.getElementById("zoom").value/100.0;
		scene.symbol.scale.y = document.getElementById("zoom").value/100.0;
		createDragAndDropFor(scene.symbol);
		scene.ac(scene.symbol);
	};

	// update symbol scale
	document.getElementById("zoom").oninput = function(event) {
		if (scene.symbol) {
			scene.symbol.scale.x = this.value/100.0;
			scene.symbol.scale.y = this.value/100.0;
		}
	};

	// toggle checkerboard background
	document.getElementById("background").onclick = function(event) {
		if (scene.bg) {
			document.body.style.backgroundImage = "";
		} else {
			document.body.style.backgroundImage = "url('background.png')";
		}
		scene.bg = !scene.bg;
	}

});

Scene.assets = {
    shapes: "../azran.shapes.txt",
    animations: "../azran.animations.json",
    pet: "../pet.shapes.txt",
    pet_a: "../pet.animations.json",
    jotapdur: "../jotapdur.shapes.txt",
    jotapdur_a: "../jotapdur.animations.json"
};

Scene.libraries = {
	"character": "animations",
	"pet": "pet_a",
	"mt.jotapdur": "jotapdur_a"
}

window.debug = document.location.href.indexOf("?debug") !== -1 || document.location.href.indexOf("&debug") !== -1;

window.onload = function() {
    let app = new PIXI.animate.Scene(window.innerWidth, window.innerHeight, {
        view: document.getElementById("stage"),
		transparent: true,
        antialias: true
    }).load(Scene);
}
