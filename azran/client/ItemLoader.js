"use strict";
var Library = require('./Library.js').Library;
var Item = require('./Item.js').Item;

class ItemLoader {

	static init(path) {
		let c = this.constructor;
		c.libraries = {};
		c.path = path;
		c.initialized = true;
	}

	static async preload(library) {
		let c = this.constructor;
		let namespace = library.split(".").slice(0,-1).join(".")+".*";
		if (!c.initialized)
			throw "ItemLoader not initialized";

		if (!(namespace in c.libraries)) {
			c.libraries[namespace] = await new Library(c.path, namespace).build();
		}

		return c.libraries[namespace];
	}

	static unload(library) {
		let c = this.constructor;
		if (!c.initialized)
			throw "ItemLoader not initialized";

		c.libraries[library] = undefined;
		delete c.libraries[library];

		return this;
	}

	static async getItem(identifier) {
		let c = this.constructor;
		if (!c.initialized)
			throw "ItemLoader not initialized";

		let library = await this.preload(identifier);
		let commands = await library.getItem(identifier);

		return new Item(library, identifier, commands, this.constructor);
	}
}

ItemLoader.initialized = false;

exports.ItemLoader = ItemLoader;
