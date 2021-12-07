import React, { useEffect, useState } from "react";
import CardOrder from "../components/CardOrder";
import getOrders from "../helpers/getOrders";

import io from "socket.io-client";

const socket = io("http://100.25.7.210:30008", { transports: ["websocket"] });

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const updateOrders = () => {
    getOrders()
      .then((newOrders) => {
        if (newOrders.length == 0) {
          setOrders([])
        } else {
          setOrders(newOrders)
        }
      })
      .catch((err) => console.error(err));
  };

  socket.on("Order:newOrder", () => {
    updateOrders();
  });

  useEffect(() => {
    updateOrders();
  }, []);

  return (
    <div className="row ">
      {orders.length == 0 ? (
        <div className="col-4">
          <div className="alert alert-danger m-5" role="alert">
            No tienes ningun pedido
          </div>
        </div>
      ) : <CardOrder orders={orders} />}
    </div>
  );
};

export default Orders;
