import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ListOrderFinished from "../components/ListOrderFinished";
import TableFinished from "../components/TableFinished";
import getOrdersFinished from "../helpers/getOrdersFinished";
import getPlates from "../helpers/getPlates";
import postOrderDetailUpdate from "../helpers/postOrderDetailUpdate";
import postOrderUpdate from "../helpers/postOrderUpdate";
import postSale from "../helpers/postSale";

import io from "socket.io-client";

const socket = io("http://100.25.7.210:30008", { transports: ["websocket"] });

const initialOrder = {
  command: {},
  commandDetails: [],
};

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [plates, setPlates] = useState([]);
  const [order, setOrder] = useState(initialOrder);
  const [totalPriceTableFinished, setTotalPriceTableFinished] = useState();

  const updateOrder = () => {
    getOrdersFinished()
      .then((newOrders) => {
        if (newOrders.length == 0) {
          setOrders([]);
        } else {
          setOrders(newOrders);
        }
      })
      .catch((err) => console.log(err));
  };

  const updatePlate = () => {
    getPlates()
      .then((newPlates) => setPlates(newPlates))
      .catch((err) => console.log(err));
  };

  const selectOrderFinished = (e) => {
    //busca la orden para vender segun el id
    //console.log(e.target.value);
    const selectOrder = orders.filter(
      (orderNew) => orderNew.command.id === parseInt(e.target.value)
    );
    setOrder(selectOrder[0]);
  };

  const sendSaleOrder = () => {
    const { command, commandDetails } = order;

    //primero recorremos la lista de ordenes para guardar las modificaciones
    commandDetails.forEach((command) => {
      postOrderDetailUpdate(command).then((commandNew) =>
        console.log(commandNew)
      );
    });
    //luego modifcamos la cabeza, cambiado el estado a vendido "V"
    const data = { ...command, state: "V" };
    postOrderUpdate(data).then((orderNew) => console.log(orderNew));
    //por ultimo hacmos la peticio al microservico sale-serice
    const dataSale = { id: command.id, total_price: totalPriceTableFinished };
    console.log("Esta es la data sale", dataSale);
    const res = postSale(dataSale);
    toast.promise(res, {
      loading: "Enviando...",
      success: "Se registro con exito",
      error: "Ocurrio un error al resgistrar",
    });
    socket.emit("Orders:SaleOrder");
    setOrder(initialOrder);
  };

  socket.on("Order:updateOrders", () => {
    updateOrder();
  });

  const totalPriceAmount = () => {
    const listaPrices = order.commandDetails
      .map((commandDetail) => {
        if (commandDetail.state) {
          return plates
            .filter((plate) => plate.id === commandDetail.plate_id)
            .map((plate) => plate.price * commandDetail.amount)[0];
        } else {
          return 0;
        }

        /*return plates
        .filter((plate) => plate.id === commandDetail.plate_id)
        //.map((plate) => plate.price * commandDetail.amount)[0];*/
      })
      .reduce((prev, curr) => prev + curr);
    let total = 0;
    setTotalPriceTableFinished(listaPrices);
    return total;
  };

  useEffect(() => {
    updateOrder();
    updatePlate();
  }, []);

  return (
    <div className="row justify-content-md-center mt-1">
      <div className="col-12 col-sm-4 pt-2">
        <div className="card p-3">
          <h3>Venta</h3>
          <select
            className="form-select form-control"
            onChange={selectOrderFinished}
            onClick={totalPriceAmount}
          >
            <option value="0">Seleccion un pedido</option>
            {orders.map((order) => (
              <option key={order.command.id} value={order.command.id}>
                Mesa : {order.command.tablet}
              </option>
            ))}
          </select>
          {Object.keys(order.command).length === 0 || order == undefined ? (
            <div className="alert alert-danger mt-4" role="alert">
              Seleccione un pedido
            </div>
          ) : (
            <table className="table mt-4 table-bordered border-secondary">
              <TableFinished
                command={order.command}
                totalPriceTableFinished={totalPriceTableFinished}
              />
            </table>
          )}

          {Object.keys(order.command).length === 0 || order == undefined ? (
            <button
              className="btn btn-primary bnt-block mt-2"
              onClick={sendSaleOrder}
              disabled
            >
              Guardar Venta
            </button>
          ) : (
            <button
              className="btn btn-primary bnt-block mt-2"
              onClick={sendSaleOrder}
            >
              Guardar Venta
            </button>
          )}
        </div>
      </div>
      <div className="col-12 col-sm-4 pt-2">
        <div className="card">
          {Object.keys(order.command).length === 0 || order == undefined ? (
            <div className="alert alert-danger m-3" role="alert">
              Seleccione un pedido
            </div>
          ) : (
            order.commandDetails.map((commandDetail) => (
              <ListOrderFinished
                key={commandDetail.id}
                commandDetail={commandDetail}
                plates={plates}
                totalPriceAmount={totalPriceAmount}
              />
            ))
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Sales;
