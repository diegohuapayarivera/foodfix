import axios from "axios";

const getOrdersFinished = async () => {
  const url = "http://3.90.213.95:30007/order/finished";
  const res = await axios.get(url);
  const orders = res.data;
  return orders;
};

export default getOrdersFinished;
