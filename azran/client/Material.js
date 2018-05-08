"use strict";

const MATERIAL_IDENTIFIER_FORMAT = /^([a-zA-Z0-9_]{1,}\.){0,}[a-zA-Z0-9_]{1,}$/g;

class Material {
	constructor(path, identifier, onLoadCallback) {
		this.identifier = identifier;
		this.path = path;
		this.onLoadCallback = onLoadCallback;
		this.loaded = false;

		this.build(this.constructor.materialPath(path, identifier));
	}

	build(url) {
		this.onLoadCallback(this);
	}

	isLoaded() {
		return this.loaded;
	}

	static materialPath(path, identifier) {
		let url = path;
		url += url.endsWith("/") ? "" : "/";

		if (!identifier.match(MATERIAL_IDENTIFIER_FORMAT)) {
			throw "Wrong identifier format "+identifier+" (expecting $com.namespace.*)";
		}

		identifier = identifier.replace(/(\$|\*)/g, '').replace(/\./g, '/');

		return url + identifier;
	}
}

exports.Material = Material;
