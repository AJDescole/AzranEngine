"use strict";
require('pixi.js');
require('pixi-animate');
var Material = require('./Material.js').Material;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const MATERIAL_IDENTIFIER_FORMAT = "^\([a-zA-Z0-9_]{1,}\.){1,}$";

class ShapeMaterial extends Material {

	async load(url) {
		this.shapes = [];
		let material = this;

		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest;
			req.open('GET', url, true);
			req.onreadystatechange = function(event) {
				if (req.readyState == 4) {
					if (req.status == 200) {
						let shapes = PIXI.animate.utils.deserializeShapes(req.responseText);
						for (let index in shapes) {
							for (let i in shapes[index]) {
								let arg = shapes[index][i];
								if (typeof arg == 'string' && arg[0] === '#') {
									shapes[index][i] = PIXI.animate.utils.hexToUint(arg);
								}
							}
						}

						material.shapes = shapes;
						material.loaded = true;
						resolve(material);
					}
					else {
						reject("Shape file not found");
					}
				}
			};
			req.send(null);
		});
	}

	getShape(index) {
		console.log(this.shapes[index]);
		return this.shapes[index];
	}

	static materialPath(path, identifier) {
		return super.materialPath(path, identifier) + ".txt";
	}
}

exports.ShapeMaterial = ShapeMaterial;
