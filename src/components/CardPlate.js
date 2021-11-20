import React, { useState, useEffect } from "react";
import getPlates from "../helpers/getPlates";


const Card = ({ plate, setPlate, addOrderList, sendOrder }) => {
  const [plates, setPlates] = useState([]);

  const uploadPlate = () => {
    getPlates().then((newPlates) => {
      setPlates(newPlates);
    });
  };

  useEffect(() => {
    uploadPlate();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    sendOrder();
  };

  const onChange = (e) => {
    /*selectPlate es el plato seleccionado en el opcion
      plates son todos los platos obtenidos de la BD 
      validamos si el plato selecionado tiene un ID
      en caso no tenga un ID significa que no se selecciono nada 
      y si tiene un id obtenemos el nombre del plato por el ID seleccionado 
    */
    const selectPlate = plates.filter(
      (plateDTO) => plateDTO.id === parseInt(plate.plate_id)
    );
    //Si tiene un ID guardamos en el estado SetPlate
    if (selectPlate.length > 0) {
      const namePlate = selectPlate[0];
      setPlate({
        ...plate,
        [e.target.name]: e.target.value,
        name: namePlate.name,
      });
      return;
    }
    setPlate({ ...plate, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-3">
      <h5>Pedido</h5>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="col-form-label">Mesa</label>
          <input
            onChange={onChange}
            value={plate.table || ""}
            name="table"
            className="form-control"
            type="number"
            max="10"
            min="0"
          ></input>
        </div>
        <div className="mb-3">
          <label className="col-form-label">Comida</label>
          <select
            className="form-select form-control"
            onChange={onChange}
            value={plate.plate_id || ""}
            name="plate_id"
          >
            <option value="0">Seleccione un plato</option>
            {plates.map((platedto) => (
              <option key={platedto.id} value={platedto.id}>
                {platedto.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="col-form-label">Cantidad</label>
          <input
            className="form-control"
            type="number"
            min="0"
            value={plate.amount || ""}
            name="amount"
            onChange={onChange}
          ></input>
        </div>
        <div className="mb-3">
          <label className="col-form-label">Observación</label>
          <textarea
            className="form-control"
            type="number"
            value={plate.observation || ""}
            name="observation"
            onChange={onChange}
          ></textarea>
        </div>
        <button
          className="btn btn-primary btn-block mx-2"
          onClick={addOrderList}
          type="button"
        >
          Agregar
        </button>
        <button className="btn btn-primary btn-block mx-2">Enviar</button>
      </form>
    </div>
  );
};

export default Card;
