"use strict";
var Material = require('./Material.js').Material;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const MATERIAL_IDENTIFIER_FORMAT = "^\([a-zA-Z0-9_]{1,}\.){1,}$";

class ShapeMaterial extends Material {
	build(url) {
		this.shapes = [];
		let req = new XMLHttpRequest;
		let material = this;
		req.open('GET', url, true);
		req.onreadystatechange = function(event) {
			if (req.readyState == 4 && req.status == 200) {
				material.shapes = req.responseText.split("\n");

				material.loaded = true;
				material.onLoadCallback(material);
			}
		};
		req.send(null);
	}

	static materialPath(path, identifier) {
		return super.materialPath(path, identifier) + ".txt";
	}
}

exports.ShapeMaterial = ShapeMaterial;
