import express from "express";
import dotenv from 'dotenv';
// import { createServer } from "http";
import { Server } from 'socket.io'
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 6000;

app.use(
    cors({
      origin: process.env.SERVER_PATH,
    })
  );

app.on('connection', socket =>{
    console.log(`User ${socket.id} connected`);
    socket.on('message', data=>{
        console.log(data);
        app.emit('message', `${socket.id.substring(0,5)}: ${data}`)
    })
})

app.listen(process.env.PORT, () => {
    console.log("listening on port: ", process.env.PORT);
});


