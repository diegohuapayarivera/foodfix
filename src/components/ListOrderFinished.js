import React, { useState } from "react";

const ListOrderFinished = ({ commandDetail, plates, setTotalPrice }) => {
  let { state, amount, plate_id } = commandDetail;

  const [stateOrder, setStateOrder] = useState(state)

  const getPlateName = () => {
    const platesNames = plates.filter((plate) => plate.id === plate_id);
    return platesNames.map((plateName) => plateName.name);
  };

  const getPlatePrice = () => {
    const platesNames = plates.filter((plate) => plate.id === plate_id);
    return platesNames.map((plateName) => {
      const totalPrice = amount * plateName.price
      return totalPrice
    });
  };


  const changueState = () => {
    setStateOrder(!stateOrder)
    commandDetail.state = !stateOrder
    console.log(commandDetail);
  };
  return (
    <>
      <li className="list-group-item m-2">
        <input type="checkbox" checked={stateOrder} onChange={changueState} />
        <span className="badge badge-dark text-muted">X{amount}</span>
        <span className="fw-bolder">{getPlateName()} </span> 
        <span className="ps-2 fst-italic">S/.{getPlatePrice()}</span>
      </li>
    </>
  );
};

export default ListOrderFinished;
