"use strict";
require('pixi.js');
require('pixi-animate');

class Commands {

	constructor(item, logger = false) {
		this.item = item;
		this.logger = logger;
	}

	async run() {
		for (let i in this.item.commands) {
			let expr = this.item.commands[i];
			let action = expr[0];
			let args = expr.slice(1);

			if (action != "run") {
				if (this.logger) {
					console.log(expr);
				}
				this.item = await this[action](...args);
			}
		}
		return this.item;
	}

	async b(...args) {
		return this.buildCustomItem(...args);
	}
	async buildCustomItem(options, duration, loop, framerate, labels) {
		let parent = Object.getPrototypeOf(this.item);
		let MC = new parent(options, duration, loop, framerate, labels);

		for (let attr in MC) {
			this.item[attr] = MC[attr];
		}

		return this.item;
	}

	async ni(...args) {
		return this.buildNewItem(...args);
	}
	async buildNewItem(field, item) {
		this.item[field] = await this.item.loader.getItem(item);
		this.item[field].draw();
		return this.item;
	}

	async ng(...args) {
		return this.buildNewGraphics(...args);
	}
	async buildNewGraphics(field, shapes, index) {
		let material = this.item.library.materials[shapes].getShape(index);
		this.item[field] = (new PIXI.Graphics).d(material);
		return this.item;
	}

	async at(...args) {
		return this.addTimedChild(...args);
	}
	async addTimedChild(field, startFrame, duration, keyframes) {
		return this.item.at(this.item[field], startFrame, duration, keyframes);
	}

	async ac(...args) {
		return this.addChild(...args);
	}
	async addChild(...fields) {
		for (let key in fields) {
			let field = fields[key];
			this.item.addChild(this.item[field]);
		}
		return this.item;
	}

	async t(...args) {
		return this.setTransform(...args);
	}
	async setTransform(...args) {
		return this.item.setTransform(...args);
	}

	async tf(...args) {
		return this.setTransformSubObject(...args);
	}
	async setTransformSubObject(field, ...args) {
		this.item[field].t(...args);
		return this.item;
	}

	async gs(...args) {
		return this.gotoAndStop(...args);
	}
	async gotoAndStop(label) {
		this.item.gotoAndStop(label);
		return this.item;
	}

	async c(...args) {
		return this.comments(...args);
	}
	async comments(...args) {
		if (this.logger) {
			console.log("comments:", ...args);
		}
		return this.item;
	}

	async n(...args) {
		return this.nullify(...args);
	}
	async nullify(...args) {
		if (this.logger) {
			console.log("nullified:", ...args);
		}
		return this.item;
	}

	async ngac(...args) {
		return this.buildNewGraphicsAndAddChild(...args);
	}
	async buildNewGraphicsAndAddChild(shapes, index, ...transform) {
		let material = this.item.library.materials[shapes].getShape(index);
		console.log(material);
		let graphics = (new PIXI.Graphics).d(material);
		if (transform.length > 0)
			graphics.t(...transform);
		this.item.ac(graphics);
		return this.item;
	}

	async niac(...args) {
		return this.buildNewItemAndAddChild(...args);
	}
	async buildNewItemAndAddChild(identifier, ...transform) {
		let item = await this.item.loader.getItem(identifier);
		item.draw();
		if (transform.length > 1)
			item.t(...transform);
		this.item.addChild(item);
		return this.item;
	}

	async ngat(...args) {
		return this.buildNewGraphicsAndAddTimedChild(...args);
	}
	async buildNewGraphicsAndAddTimedChild(shapes, index, ...args) {
		let material = this.item.library.materials[shapes].getShape(index);
		let graphics = (new PIXI.Graphics).d(material);
		this.item.at(graphics, ...args);
		return this.item;
	}

	async niat(...args) {
		return this.buildNewItemAndAddTimedChild(...args);
	}
	async buildNewItemAndAddTimedChild(identifier, ...args) {
		let item = await this.item.loader.getItem(identifier);
		item.draw();
		this.item.at(item, ...args);
		return this.item;
	}

}

exports.Commands = Commands;