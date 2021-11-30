import axios from "axios";

const getOrdersFinished = async () => {
  const url = "http://54.226.50.179:30007/order/finished";
  const res = await axios.get(url);
  const orders = res.data;
  return orders;
};

export default getOrdersFinished;
