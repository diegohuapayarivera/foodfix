import React, { useEffect, useState } from "react";
import getPlates from "../helpers/getPlates";
import ListOrder from "./ListOrder";
import ListOrderDetail from "./ListOrderDetail";

const CardOrder = ({ orders }) => {
  const [plates, setPlates] = useState([]);
  const [stateObservation, setStateObservation] = useState(true);

  const updatePlate = () => {
    getPlates()
      .then((newPlate) => setPlates(newPlate))
      .catch((err) => console.error(err));
  };

  const changueStateObservation = () => {
    setStateObservation(!stateObservation);
  };

  useEffect(() => {
    updatePlate();
  }, []);

  return (
    <>
      {orders.map((order) => (
        <div key={order.command.id} className="col-12 col-sm-4 ">
          <div className="card p-2 m-2 mt-3">
            <div className="card-header row">
              <ListOrder
                command={order.command}
                changueStateObservation={changueStateObservation}
              />
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {stateObservation ? (
                  order.commandDetails.map((commandDetail) => (
                    <ListOrderDetail
                      key={commandDetail.id}
                      commandDetail={commandDetail}
                      plates={plates}
                    />
                  ))
                ) : (
                  <li className="list-group-item">
                    {order.command.observation}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardOrder;
