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

const socket = io("http://3.90.213.95:30008", { transports: ["websocket"] });

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [plates, setPlates] = useState([]);
  const [order, setOrder] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  /*const orderOptions = orders.map((orderNew) => {
    const data = {
      key: orderNew.command.id,
      tablet: orderNew.command.tablet,
    };
    return data;
  });*/

  const updateOrder = () => {
    getOrdersFinished()
      .then((newOrders) => {
        if (newOrders.length == 0) {
          setOrders([]);
        } else {
          setOrders(newOrders);
        }
        console.log(newOrders);
        // console.log(newOrders);
      })
      .catch((err) => console.log(err));
  };

  const updatePlate = () => {
    getPlates()
      .then((newPlates) => setPlates(newPlates))
      .catch((err) => console.log(err));
  };

  const selectOrderFinished = (e) => {
    console.log(e.target.value);
    const selectOrder = orders.filter(
      (orderNew) => orderNew.command.id === parseInt(e.target.value)
    );
    setOrder(selectOrder[0]);
  };

  const sendSaleOrder = () => {
    const { command, commandDetails } = order;
    commandDetails.forEach((command) => {
      postOrderDetailUpdate(command).then((commandNew) =>
        console.log(commandNew)
      );
    });
    const data = { ...command, state: "V" };
    postOrderUpdate(data).then((orderNew) => console.log(orderNew));
    const res = postSale(command);
    toast.promise(res, {
      loading: "Enviando...",
      success: "Se registro con exito",
      error: "Ocurrio un error al resgistrar",
    });
    socket.emit("Orders:SaleOrder");
    setOrder(0);
  };

  socket.on("Order:updateOrders", () => {
    updateOrder();
  });

  const totalPriceAmount = () => {
    const pricesTotals = order.commandDetails.map((commandDetails) => {
      return {
        prices: plates.filter(
          (plate) => plate.id === commandDetails.plate_id
        )[0],
        amounts: commandDetails.amount,
      };
    });

    return pricesTotals
      .map((pricetotal) => pricetotal.amounts * pricetotal.prices.price)
      .reduce((accumulator, curr) => accumulator + curr);
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
          >
            <option value="0">Seleccion un pedido</option>
            {orders.map((order) => (
              <option key={order.command.id} value={order.command.id}>
                Mesa : {order.command.tablet}
              </option>
            ))}
          </select>
          {order == "0" || order == undefined ? (
            <div className="alert alert-danger mt-4" role="alert">
              Seleccione un pedido
            </div>
          ) : (
            <table className="table mt-4 table-bordered border-secondary">
              <TableFinished command={order.command} totalPriceAmount={totalPriceAmount} />
            </table>
          )}

          {order == "0" || order == undefined ? (
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
              onClick={totalPriceAmount}
            >
              Guardar Venta
            </button>
          )}
        </div>
      </div>
      <div className="col-12 col-sm-4 pt-2">
        <div className="card">
          {order == "0" || order == undefined ? (
            <div className="alert alert-danger m-3" role="alert">
              Seleccione un pedido
            </div>
          ) : (
            order.commandDetails.map((commandDetail) => (
              <ListOrderFinished
                key={commandDetail.id}
                commandDetail={commandDetail}
                plates={plates}
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
