import express  from "express";
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
const app=express()

app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","POST"]
  }
})

app.get('/',(req,res)=>{
  res.json("hii")
})

io.on('connection',(socket)=>{
  console.log("User : "+socket.id);

  socket.on("message",(data)=>{
    console.log(data);
    socket.broadcast.emit('message',data)

  })
})

server.listen(5000,()=>{
  console.log("Server running...")
})














// // import { createServer } from "http";
// import { Server } from "socket.io";
// import express from 'express';
// import { createServer } from 'node:http';
// import { fileURLToPath } from 'node:url';
// import { dirname, join } from 'node:path';
// const io = new Server(server);


// const app = express();
// const server = createServer(app);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });


// io.on('connection', (socket) => {
//     console.log('a user connected');
//   });
  
// server.listen(5000, () => {
//   console.log('server running at http://localhost:5000');
// });
