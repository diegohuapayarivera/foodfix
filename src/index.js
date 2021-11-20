import express from "express";
import Server from "socket.io";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const io = Server(httpServer);

io.on("connection", (socket) => {
  socket.emit("test", "Test from server");

  socket.on('Plate:newOrder', () => {
    console.log('recibi la orden, ahora la envio');
    io.emit('Order:newOrder')
  })

  socket.on("OrderDetail:newOrderDetail", () => {
    console.log("Recibi el mensaje de actualizar ordeness");
    io.emit('Order:newOrder')
  })
});

httpServer.listen(3030);

console.log("Server listening on port 3030");
