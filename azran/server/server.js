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
                console.log("Received : %s from %s", data, client.ID);
                let msg = JSON.parse(data);
                let method = "on"+msg[0].charAt(0).toUpperCase() + msg[0].slice(1);
                let args = msg.slice(1);

                let allowed_methods = ["onJoin", "onAnimation", "onPing"];
                if (allowed_methods.indexOf(method) !== -1) {
                    s[method](client, ...args);
                }
            });
            client.on("close", function(data) {
                s.onQuit(client);
            });
        });
    }

    send(client, ...args) {
        console.log("Sent : %s to %s", args, client.ID);
        client.send(JSON.stringify(args));
    }

    broadcast(method, ID, ...args) {
        for (let i in this.users) {
            let user = this.users[i];
            if (user.readyState === WebSocket.OPEN && user.ID !== ID) {
                this.send(user, method, ID, ...args);
            }
        }
    }

    onJoin(client, gear, hat, x, y) {
        let ID = Math.random().toString(36).substring(7);

        client.ID = ID;
        client.gear = gear;
        client.hat = hat;
        client.x = x;
        client.y = y;

        for (let i in this.users) {
            let user = this.users[i];
            if (user.readyState === WebSocket.OPEN) {
                let msg = JSON.stringify(["join", user.ID, user.gear, user.hat, user.x, user.y]);
                this.send(client, "join", user.ID, user.gear, user.hat, user.x, user.y);
                this.send(user, "join", ID, gear, hat, x, y);
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

    onPing(client) {
        this.send(client, "pong");
    }
}

let server = new Server({port: 1944});
server.run();
