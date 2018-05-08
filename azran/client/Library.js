"use strict";
require('pixi.js');
require('pixi-animate');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ShapeMaterial = require("./ShapeMaterial.js").ShapeMaterial;

const LIBRARY_FILE = "library.json";
const LIBRARY_IDENTIFIER_FORMAT = /^\$([a-zA-Z0-9_]{1,}\.){1,}\*$/g;
const ITEM_IDENTIFIER_FORMAT = /^\$([a-zA-Z0-9_]{1,}\.){0,}[a-zA-Z0-9_]{1,}$/g

class Library {
	constructor(path, identifier, onLoadCallback) {
		this.identifier = identifier;
		this.path = path;
		this.onLoadCallback = onLoadCallback;

		this.loaded = false;
		this.symbols = {};
		this.materials = {};

		this.name = "";
		this.author = "";
		this.created_at = "";
		this.updated_at = "";
		this.title = {};

		this.build(Library.libraryPath(path, identifier));
	}

	isLoaded() {
		return this.loaded;
	}

	build(url) {
		let req = new XMLHttpRequest;
		let library = this;
		req.open('GET', url, true);
		req.onreadystatechange = function(event) {
			if (req.readyState == 4 && req.status == 200) {
				let response = JSON.parse(req.responseText);

				let fields = [
					"name",
					"author",
					"created_at",
					"updated_at",
					"title",
					"materials",
					"symbols"
				];
				for (let i in fields) {
					let key = fields[i];
					library[key] = response[key];
				}

				if (!library.materials) {
					library.checkIfLoaded();
				} else {
					library.loadMaterials(library.materials);
				}
			}
		};
		req.send(null);
	}

	loadMaterials(materials) {
		this.materials = {};

		let classes = {
			"shapes": ShapeMaterial
		};

		for (let key in materials) {
			if (key in classes) {
				for (let i in materials[key]) {
					let identifier = materials[key][i];
					this.materials[identifier] = false;
				}
			}
		}

		let library = this;
		for (let key in materials) {
			if (key in classes) {
				for (let i in materials[key]) {
					let identifier = materials[key][i];

					new classes[key](this.path, identifier, function(material) {
						library.materials[identifier] = material;
						library.checkIfLoaded();
					});
				}
			}
		}
	}

	checkIfLoaded() {
		if (!this.loaded) {
			let loaded = true;
			for (let key in this.materials) {
				loaded &= !!this.materials[key];
			}

			if (loaded) {
				this.loaded = true;
				this.onLoadCallback(this);
			}
		}
		return this.isLoaded();
	}

	getItem(identifier) {
		let symbol = identifier;
		if (identifier.indexOf(".") != -1) {
			if (!RegExp(ITEM_IDENTIFIER_FORMAT, 'g').test(identifier)) {
				throw "Unexpected item "+identifier+" (expecting $com.namespace.item)";
			}
			let splitted_identifier = identifier.split('.');
			let namespace = splitted_identifier.slice(0, -1).join('.')+".*";
			if (namespace != this.identifier) {
				throw "Wrong namespace "+namespace+" (expecting "+this.identifier+")";
			}

			symbol = splitted_identifier[splitted_identifier.length-1];
		}

		symbol = symbol.replace(/\$/g, "");

		if (!(symbol in this.symbols)) {
			throw "Unknown symbol "+symbol+" in "+this.identifier;
		}

		return this.symbols[symbol];
	}

	static libraryPath(path, identifier) {
		let url = path;
		url += url.endsWith("/") ? "" : "/";

		if (!identifier.match(LIBRARY_IDENTIFIER_FORMAT)) {
			throw "Wrong identifier format "+identifier+" (expecting $com.namespace.*)";
		}

		identifier = identifier.replace(/(\$|\*)/g, '').replace(/\./g, '/');

		return url + identifier + LIBRARY_FILE;
	}
}

exports.Library = Library;
