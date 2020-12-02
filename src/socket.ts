import { Server } from "https";
import SocketIO, { Socket } from "socket.io";
import os from "os";

const webSocket = (server: Server) => {
  const io = SocketIO(server);
  
  io.sockets.on('connection', (socket: Socket) => {

  // convenience function to log server messages on the client
  // 클라이언트로 보내는 로그 
  function log(log: string) {
    socket.emit('log', log);
  }

  socket.on('message', (message: string) => {
    log('Client said: ' + message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  // 클라이언트로 room name을 입력받음 
  socket.on('create or join', (room: string) => {
    log('Received request to create or join room ' + room);

    // room name에 들어온 클라이언트의 수에 따라 다르게 처리
    const clientsInRoom = io.sockets.adapter.rooms[room];
    const numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    // 0명일 경우 방을 새로 만듬 
    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);
    } 
    // 1명일 경우 room에 들어가고 연결 
    else if (numClients <= 5) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready');
    } 
    // 2명 이상일 땐 꽉 찬 상태로 처리 (수정 필요)
    else { // max two clients
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

  socket.on('bye', () =>{
    console.log('received bye');
  });

});
}


export default webSocket;