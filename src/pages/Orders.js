import React, { useEffect, useState } from "react";
import CardOrder from "../components/CardOrder";
import getOrders from "../helpers/getOrders";

import io from "socket.io-client";

const socket = io("http://3.90.213.95:30008", { transports: ["websocket"] });

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const updateOrders = () => {
    getOrders()
      .then((newOrders) => setOrders(newOrders))
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
      <CardOrder orders={orders} />
    </div>
  );
};

export default Orders;
