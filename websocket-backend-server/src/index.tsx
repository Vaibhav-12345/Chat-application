// we make first simple server to test

import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 3000 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = []; //[socekt1 ,socket2 ,socket3]

wss.on("connection", (socket) => {

  socket.on("message", (message) => {
    // message return string formate object "{ name : hello}"

    // so we parse and store in variable 
    // @ts-ignore 
    const parsedMessage=JSON.parse(message);
    if(parsedMessage.type === 'join'){
        allSockets.push({
            socket,
            room:parsedMessage.payload.roomId
        })
    }


    if(parsedMessage.type === 'chat'){
       const currentUserRoom=allSockets.find((x)=>x.socket===socket)?.room


    //    or
    // let currentUserRoom2=null;
    // for (let i = 0; i < allSockets.length; i++) {
    //    if(allSockets[i].socket===socket){
    //     currentUserRoom2=allSockets[i].room
    //    }
        
    // }


     allSockets.forEach(curr => {
        if(curr.room === currentUserRoom){
            curr.socket.send(parsedMessage.payload.message)
        }
     });




    }
  });



});
