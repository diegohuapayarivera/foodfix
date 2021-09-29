import React, { useEffect, useState } from "react";
import getPlates from "../helpers/getPlates";

const CardOrder = ({ orders }) => {
  const [plates, setPlates] = useState([]);

  const getPlateName = (plateObj) => {
    const platesNames = plates.filter(
      (plate) => plate.id === plateObj.plate_id
    );
    return platesNames.map((plateName) => plateName.name);
  };

  const updatePlate = () => {
    getPlates()
      .then((newPlate) => setPlates(newPlate))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updatePlate();
  }, []);

  return (
    <>
      {orders.map((order) => (
        <div key={order.id} className="col-12 col-sm-4 ">
          <div className="card p-2 m-2 mt-3">
            <div className="card-header">Mesa: {order.table}</div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {order.plates.map((plate) => (
                  <li key={plate.plate_id} className="list-group-item">
                    <span className="badge badge-dark text-muted">
                      X{plate.amount}
                    </span>
                    {getPlateName(plate)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardOrder;
