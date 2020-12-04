import { Server } from "https";
import os from "os";
import socketIO, { Socket } from 'socket.io';
import { Application } from "express";
import { BusinessLogic, NextFunction } from "./BusinessLogic";

const webSocket = (server: Server, app: Application, verifyToken: BusinessLogic) => {
  const io = socketIO(server);
  io.sockets.on('connection', (socket: Socket) => {
    app.set("io", io);

    // 토큰 인증 미들웨어 베포 시에만 필요 
    //io.use((socket: Socket, next: NextFunction) => {
    //  verifyToken(socket.request, socket.request.res, next);
    //});

    function log(message: string) {
      socket.emit('log', message);
    }
  
    // 클라이언트끼리 p2p 통신을 위한 signaling server  
    // SessionDescriptionProtocal을 클라이언트끼리 주고받음 
    socket.on('message', (message: object, room: string) => {
      console.log(typeof message);
      log('Client said: ' + message);
      // for a real app, would be room-only (not broadcast)
      socket.to(room).emit('message', message);
    });
  
    socket.on("candidate", (message: object, room: string) => {
      socket.to(room).emit("candidate", message);
    });

    socket.on("candidate2", (message: object, room: string) => {
      socket.to(room).emit("candidate2", message);
    });

    socket.on("offer", (message: object, room: string) => {
      socket.to(room).emit("offer", message);
    });

    socket.on("offer2", (message: object, room: string) => {
      socket.to(room).emit("offer2", message);
    });

    socket.on("answer", (message: object, room: string) => {
      socket.to(room).emit("answer", message);
    });

    socket.on("answer2", (message: object, room: string) => {
      socket.to(room).emit("answer2", message);
    });

    socket.on('create or join', (room: string) => {
      log('Received request to create or join room ' + room);
  
      const clientsInRoom: SocketIO.Room = io.sockets.adapter.rooms[room];
      const numClients: number = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
      log('Room ' + room + ' now has ' + numClients + ' client(s)');
  
      if (numClients === 0) {
        socket.join(room);
        log('Client ID ' + socket.id + ' created room ' + room);
        socket.emit('created', room, socket.id);
      } else if (numClients <= 5) {
        log('Client ID ' + socket.id + ' joined room ' + room);
        io.sockets.in(room).emit('join', room);
        socket.join(room);
        socket.emit('joined', room, socket.id);
        io.sockets.in(room).emit('ready');
      } else { // max two clients
        socket.emit('full', room);
      }
    });
  
    socket.on('ipaddr', () => {
      const ifaces = os.networkInterfaces();
      for (let dev in ifaces) {
        ifaces[dev]!.forEach((details) => {
          if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
            socket.emit('ipaddr', details.address);
          }
        });
      }
    });
  
    socket.on('bye', () => {
      console.log('received bye');
    });
});
}


export default webSocket;