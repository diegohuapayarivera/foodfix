import React from "react";

const Table = ({ plates, setPlates }) => {
  const onClickDelete = (deleteOrder) => {
    const platesNew = plates.filter(
      (platesNew) => platesNew.plate_id !== deleteOrder.plate_id
    );

    setPlates([...platesNew]);
  };

  return (
    <div className="card p-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Plato</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plates.map((plate) => (
            <tr key={plate.plate_id}>
              <td>{plate.name} </td>
              <td>{plate.amount} </td>
              <td>
                <i
                  className="fas fa-trash-alt px-2"
                  onClick={() => onClickDelete(plate)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
