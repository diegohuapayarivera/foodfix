import React, { useState } from "react";
import CardPlate from "../components/CardPlate";
import Table from "../components/Table";
import postOrder from "../helpers/postOrder";

const initialPlate = {
  plate_id: "",
  table: "",
  amount: "",
  observation: "",
  name: "",
};

const Main = () => {
  const [plate, setPlate] = useState(initialPlate);
  const [plates, setPlates] = useState([]);

  const addOrderList = () => {
    setPlates([...plates, plate]);
    setPlate({
      plate_id: "",
      amount: "",
      observation: "",
      name: "",
      table: plate.table,
    });
  };

  const sendOrder = () => {
    const platesDTO = [];
    plates.forEach((plate) => {
      const { plate_id, amount, observation } = plate;
      platesDTO.push({ plate_id, amount, observation });
    });
    const orderDTO = {
      table: plate.table,
      plates: platesDTO,
    };
    postOrder(orderDTO).then((newOrder) => console.log(newOrder));
    setPlates([])
    setPlate(initialPlate)
  };

  return (
    <div className="row justify-content-md-center">
      <div className="col-12 col-sm-4 pt-2">
        <CardPlate
          plate={plate}
          setPlate={setPlate}
          addOrderList={addOrderList}
          sendOrder={sendOrder}
        />
      </div>
      <div className="col-12 col-sm-4 pt-2">
        <Table plates={plates} setPlates={setPlates} setPlate={setPlate} />
      </div>
    </div>
  );
};

export default Main;
