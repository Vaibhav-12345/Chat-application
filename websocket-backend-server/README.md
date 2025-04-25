import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:3000});


let userCount=0;
let allSockets=[];

wss.on('connection',(socket)=>{
    allSockets.push(socket)


    userCount++;
    console.log('user connected #'+ userCount)

// one way communication done client to websocket server 
socket.on('message',(message)=>{
    console.log('message recieved ' + message.toString())

    // websocket server send to the client 
    socket.send(message.toString()+' : sent from the server')  
})



})



websocket is present by default already exist 
so we dont import 
that is nativaly available 
but we need library wala websocket chahiye




ab dono side hum bat kar shakte hai 

// we make first simple server to test 

import { WebSocketServer ,WebSocket} from "ws";

const wss = new WebSocketServer({port:3000});


let userCount=0;
let allSockets: WebSocket[] =[];

wss.on('connection',(socket)=>{
    allSockets.push(socket)


    userCount++;
    console.log('user connected #'+ userCount)

// one way communication done client to websocket server 
socket.on('message',(message)=>{
    console.log('message recieved ' + message.toString())


    // jo bhi sare webcoket se new user sare ke sare connect honge usko ek array me store karlo 

    allSockets.forEach((curr)=>{
    // websocket server send to the client 
    curr.send(message.toString()+' : sent from the server')  
    })


    console.log(allSockets.forEach((ele)=>console.log(ele.binaryType)));
})


jab kuch user disconnect ho jyaegege to bache huye user dikhenege
socket.on('disconnect',()=>{
    allSockets=allSockets.filter((x=> x != socket)
  })

})






// import express from 'express';
// const app=express()
// app.listen(3000)