"use strict";
var WebSocket = require('ws');

let server = new WebSocket.Server({port: 1944});
let users = {};

server.on("connection", function(client) {
	client.on("message", function(data) {
		console.log("Received : %s", data);
		let msg = JSON.parse(data);

		if (msg[0] == "join") {
			let ID = msg[1];
			client.ID = ID;
			for (let i in users) {
				client.send(users[i]);
			}
			users[ID] = data;
		} else if (msg[0] == "sm" || msg[1] == "em") {
			let ID = msg[1];
			let user = JSON.parse(users[ID]);
			user[4] = msg[3];
			user[5] = msg[4];
			users[ID] = JSON.stringify(user);
		}

		server.clients.forEach(function(c) {
			if (c !== client && c.readyState === WebSocket.OPEN) {
				c.send(data);
			}
		});
	});
	client.on("close", function(data) {
		console.log(client.ID, "closed");
		delete users[client.ID];

		server.clients.forEach(function(c) {
			if (c !== client && c.readyState === WebSocket.OPEN) {
				c.send(JSON.stringify(["quit", client.ID]));
			}
		});
	});
});
