"use strict";
var WebSocket = require('ws');

class Server {
    constructor(options) {
        this.ws = new WebSocket.Server(options);
        this.users = {};
    }

    run() {
        let s = this;
        this.ws.on("connection", function(client) {
            client.on("message", function(data) {
                console.log("Received : %s", data);
                let msg = JSON.parse(data);
                let method = "on"+msg[0].charAt(0).toUpperCase() + msg[0].slice(1);
                let args = msg.slice(1);

                let allowed_methods = ["onJoin", "onAnimation"];
                if (allowed_methods.indexOf(method) !== -1) {
                    s[method](client, ...args);
                }
            });
            client.on("close", function(data) {
                s.onQuit(client);
            });
        });
    }

    broadcast(method, ID, ...args) {
        console.log("bcasting",method, ID,args);
        for (let i in this.users) {
            let user = this.users[i];
            if (user.readyState === WebSocket.OPEN && user.ID !== ID) {
                user.send(JSON.stringify([method, ID, ...args]));
            }
        }
    }

    onJoin(client, gear, hat, x, y) {
        let ID = Math.random().toString(36).substring(7);
        let bcast = JSON.stringify(["join", ID, gear, hat, x, y]);

        client.ID = ID;
        client.gear = gear;
        client.hat = hat;
        client.x = x;
        client.y = y;

        for (let i in this.users) {
            let user = this.users[i];
            if (user.readyState === WebSocket.OPEN) {
                let msg = JSON.stringify(["join", user.ID, user.gear, user.hat, user.x, user.y]);
                client.send(msg);
                user.send(bcast);
            }
        }
        this.users[ID] = client;
    }

    onAnimation(client, label, x, y) {
        client.x = x;
        client.y = y;

        this.broadcast("animation", client.ID, label, x, y);
    }

    onQuit(client) {
        this.broadcast("quit", client.ID);
        delete this.users[client.ID];
    }
}

let server = new Server({port: 1944});
server.run();
