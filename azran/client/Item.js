"use strict";
require('pixi.js');
require('pixi-animate');

var Commands = require('./Commands.js').Commands;

class Item extends PIXI.animate.MovieClip {
	constructor(library, identifier, commands, loader = null) {
		super();
		this.drawn = false;
		this.identifier = identifier;
		this.commands = commands;
		this.library = library;
		this.loader = loader;
	}

	isDrawn() {
		return this.drawn;
	}

	async draw() {
		return await this.applyCommands();
	}

	async applyCommands() {
		let result = await new Commands(this).run();
		this.drawn = true;
		return result;
	}


}

exports.Item = Item;
