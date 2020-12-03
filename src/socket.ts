import { Server } from "https";
import os from "os";
import socketIO, { Socket } from 'socket.io'

const webSocket = (server: Server) => {
  const io = socketIO(server);
  io.sockets.on('connection', (socket: Socket) => {

    // convenience function to log server messages on the client
    function log(message: string) {
      socket.emit('log', message);
    }
  
    socket.on('message', (message: string) => {
      log('Client said: ' + message);
      // for a real app, would be room-only (not broadcast)
      socket.broadcast.emit('message', message);
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
  
      } else if (numClients === 1) {
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