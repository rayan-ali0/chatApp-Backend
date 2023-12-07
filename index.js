import express from "express";
import http from "http"; // import http module to create a server
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
app.use(cors())

const server = http.createServer(app); // create an HTTP server using express app
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    // origin: "*",
    methods: ["GET", "POST"]
  }
});

// const PORT = process.env.PORT || 6000;

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('message', (data) => {
    console.log(data);
    socket.broadcast.emit('message', `${socket.id.substring(0, 5)}: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
});

io.listen(7779);
// server.listen(PORT, () => {
//   console.log("Server is listening on port:", PORT);
// });
