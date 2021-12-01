import React from "react";
import postOrderDetailUpdate from "../helpers/postOrderDetailUpdate";

import io from "socket.io-client";

const socket = io("http://3.90.213.95:30008", { transports: ["websocket"] });

const ListOrderDetail = ({ commandDetail, plates }) => {
  const { id, plate_id, order_id, state, amount } = commandDetail;

  const getPlateName = () => {
    const platesNames = plates.filter((plate) => plate.id === plate_id);
    return platesNames.map((plateName) => plateName.name);
  };

  const changeOrderDetailState = () => {
    const data = { id, plate_id, state: !state, amount, order_id };
    postOrderDetailUpdate(data).then((orderDetailNew) =>
      console.log(orderDetailNew)
    );
    socket.emit("OrderDetail:newOrderDetail");
  };
  return (
    <>
      <li key={id} className="list-group-item nav-item">
        <input
          type="checkbox"
          checked={state}
          onChange={changeOrderDetailState}
        />
        <span className="badge badge-dark text-muted">X{amount}</span>
        {getPlateName()}
      </li>
    </>
  );
};

export default ListOrderDetail;
