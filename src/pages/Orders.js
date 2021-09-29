import React, { useEffect, useState } from "react";
import CardOrder from "../components/CardOrder";
import getOrders from "../helpers/getOrders";

import io from "socket.io-client";

const socket = io("http://localhost:3030", { transports: ["websocket"] });



const Orders = () => {
  const [orders, setOrders] = useState([]);

  socket.on('test', (message) => { 
    
    socket.emit('envio')
  })



  const test = () => {
    console.log('recibidoooo babyyyy ttps://gestionpedidosmicroservice.herokuapp.com/api/sales/sale');
  }
  socket.on('recibido', test)

  const updateOrders = () => {
    getOrders()
      .then((newOrders) => setOrders(newOrders))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateOrders();
  }, []);

  return (
    <div className="row ">
      <CardOrder orders={orders} />
    </div>
  );
};

export default Orders;
