"use strict";

const MATERIAL_IDENTIFIER_FORMAT = /^([a-zA-Z0-9_]{1,}\.){0,}[a-zA-Z0-9_]{1,}$/g;

class Material {
	constructor(path, identifier) {
		this.identifier = identifier;
		this.path = path;
		this.loaded = false;
	}

	async build() {
		return await this.load(this.constructor.materialPath(this.path, this.identifier));
	}

	async load(url) {
		return this;
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
