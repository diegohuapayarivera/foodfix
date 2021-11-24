import React from "react";
import postOrderUpdate from "../helpers/postOrderUpdate";

import io from "socket.io-client";

const socket = io("http://localhost:3030", { transports: ["websocket"] });

const ListOrder = ({ command, changueStateObservation }) => {
  const { tablet, start, id, state, observation } = command;

  const changeOrdeState = (e) => {
    const data = {
      id,
      tablet,
      observation,
      start,
      state: e.target.value,
    };
    postOrderUpdate(data).then((orderupdate) =>
      console.log("Esto trajo ", orderupdate)
    );
    socket.emit("OrderDetail:newOrderDetail");
  };
  return (
    <>
      <div className="col-sm-4 col-6">
        <label>
          Mesa: {tablet} : {start}
        </label>
      </div>
      <div className="col-sm-4 me-auto col-6">
        <button className="btn btn-primary" onClick={changueStateObservation}>
          Observación
        </button>
      </div>
      <div className="col-sm-4 col-6">
        <label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={state}
            onChange={changeOrdeState}
          >
            <option value="I">Iniciado</option>
            <option value="P">Proceso</option>
            <option value="T">Terminado</option>
          </select>
        </label>
      </div>
    </>
  );
};

export default ListOrder;
