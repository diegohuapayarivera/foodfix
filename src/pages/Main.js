import React, { useState } from "react";
import CardPlate from "../components/CardPlate";
import Table from "../components/Table";
import postOrder from "../helpers/postOrder";
import {Toaster, toast} from 'react-hot-toast'

import io from "socket.io-client";

const socket = io("http://54.226.50.179:30008", { transports: ["websocket"] });

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

  /*const validateFormAddList = () => {
    const { plate_id, amount} = plate
    if (plate_id === '' || amount === '') {
        console.log('No tiene nada')
    }
  };*/

  const addOrderList = () => {
    //validateFormAddList()
    setPlates([...plates, plate]);
    setPlate({
      plate_id: "",
      amount: "",
      observation: plate.observation,
      name: "",
      table: plate.table,
    });
  };

  const sendOrder = () => {
    const platesDTO = plates.map((newPlate) => {
      const { plate_id, amount } = newPlate;
      return { plate_id, amount };
    });
    const orderDTO = {
      command: {
        tablet: plate.table,
        observation: plate.observation
      },
      commandDetails: platesDTO,
    };
    //console.log("Asi estamos enviando al servidor",orderDTO);
    //postOrder(orderDTO).then((newOrder) => console.log(newOrder));
    const resultOrder = postOrder(orderDTO);
    toast.promise(resultOrder, {
      loading: "Cargando...",
      success: "Se envio",
      error: (error) => "Ocurrio un error"
    })
    socket.emit("Plate:newOrder");
    //toast.success("Se envio con exito")
    resetState();
  };

  const resetState = () => {
    setPlates([]);
    setPlate(initialPlate);
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
      <Toaster/>
    </div>
  );
};

export default Main;
