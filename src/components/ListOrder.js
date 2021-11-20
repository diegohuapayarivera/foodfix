import React, { useState } from "react";
import postOrderUpdate from "../helpers/postOrderUpdate";

const ListOrder = ({ command }) => {
  const { tablet, start, id, state, observation } = command;
  const [stateOrder, setStateOrder] = useState(state);

  const changeOrdeState = (e) => {
    const data = {
      id,
      tablet,
      observation,
      start,
      state: e.target.value,
    };
    postOrderUpdate(data).then((orderupdate) =>console.log("Esto trajo ", orderupdate ))
  };
  return (
    <>
      <div className="col-sm-4">
        <label>
          Mesa: {tablet} : {start}
        </label>
      </div>
      <div className="col-sm-4 me-auto">
        <button className="btn btn-primary">Observación</button>
      </div>
      <div className="col-sm-4">
        <label>
          <select
            className="form-select"
            aria-label="Default select example"
            value={stateOrder}
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
