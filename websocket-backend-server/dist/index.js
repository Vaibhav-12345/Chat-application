"use strict";
// we make first simple server to test
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 3000 });
let allSockets = []; //[socekt1 ,socket2 ,socket3]
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        // message return string formate object "{ name : hello}"
        var _a;
        // so we parse and store in variable 
        // @ts-ignore 
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type === 'join') {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === 'chat') {
            const currentUserRoom = (_a = allSockets.find((x) => x.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
            //    or
            // let currentUserRoom2=null;
            // for (let i = 0; i < allSockets.length; i++) {
            //    if(allSockets[i].socket===socket){
            //     currentUserRoom2=allSockets[i].room
            //    }
            // }
            allSockets.forEach(curr => {
                if (curr.room === currentUserRoom) {
                    curr.socket.send(parsedMessage.payload.message);
                }
            });
        }
    });
});
