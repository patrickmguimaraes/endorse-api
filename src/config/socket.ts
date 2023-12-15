// import express from 'express';
// const app = express();
// import http from 'http';
// const server = http.createServer(app);
// import { Server } from "socket.io";
// import {logger} from './logger';
// const io = new Server(server);
// import { authService, userService, conversaService } from "./../repositories/user.repository";

// var allClients = [];

// io.on('connection', async socket => {
//   let socketSaved;

//   socket.emit("is-connected", "connected");

//   socket.on("disconnecting", () => {
//     socket.emit("is-connected", "disconnected");
//   });

//   socket.on('connected', async (user, callbackFunction) => {
//     var user;
    
//     if(user) {
//       socketSaved = {usuarioId: user.id, socket: socket};
//       allClients.push(socketSaved); 

//       const chats = await conversaService.getChats(socketSaved.usuarioId);

//       chats.forEach(chat => {
//         socket.join(chat._id+"");
//       });

//       callbackFunction({status: 'connected'});
//       logger.info('Socket ' + allClients.indexOf(socketSaved) + ' connected: ' + socket.id);
//     }
//     else {
//       callbackFunction({status: 'erro'});
//     }
//   });

//   socket.on('disconnect', async () => {
//     var index;

//     for (let i = 0; i < allClients.length; i++) { if(allClients[i].socket.id==socket.id) { allClients.splice(i, 1); index = i; break; } }

//     logger.info("Socket " + index + " disconnected: " + socket.id);
//     socketSaved = null;
//   });

//   socket.on("online", async (callbackFunction) => {
//     if(socketSaved) {
//       //const user = await userService.updateUserById(socketSaved.usuarioId, {vistoPorUltimo: 0});
      
//       if(user) { callbackFunction({status: "online"}); }
//       else { callbackFunction({status: "erro"}); }
//     }
//     else { callbackFunction({status: "erro"}); }
//   });

//   socket.on("new-room", (idNewRoom, userId) => {
//     socket.join(idNewRoom);

//     for (let i = 0; i < allClients.length; i++) { if(allClients[i].usuarioId==userId) { allClients[i].socket.join(idNewRoom); break; } }
//   });

//   socket.on("new-message2", (idRoom, idMessage, callbackFunction) => {
//     logger.info("All sockets from ROOM: " + idRoom);
    
//     io.in(idRoom).fetchSockets().then(sockets => {
//       logger.info(sockets.length);

//       sockets.forEach(s => {
        
//       });
//     })

//     callbackFunction("added");
//   });

//   socket.on("offline", async (callbackFunction: any) => {
//     if(socketSaved) {
//       const user = await userService.updateUserById(socketSaved.usuarioId, {vistoPorUltimo: Date.now()});
  
//       if(user) {  callbackFunction({status: "offline"}); }
//       else { callbackFunction({status: "erro"}); }
//     }
//     else { callbackFunction({status: "erro"}); }
//   });
// });

// io.of("/").adapter.on("create-room", (room: any) => {
//   console.log(`room ${room} was created`);
// });

// io.of("/").adapter.on("join-room", (room: any, id: number) => {
//   console.log(`socket ${id} has joined ROM ${room}`);
// });

// io.of("/").adapter.on("leave-room", (room: any, id: number) => {
//   console.log(`socket ${id} has leaved room ${room}`);
// });

// io.of("/").adapter.on("delete-room", (room: any) => {
//   console.log(`room ${room} was deleted`);
// });

// export const io = {...io}
// module.exports = {
//   io
// }