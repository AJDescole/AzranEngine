"use strict";
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
						material.shapes = req.responseText.split("\n");

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

	static materialPath(path, identifier) {
		return super.materialPath(path, identifier) + ".txt";
	}
}

exports.ShapeMaterial = ShapeMaterial;
