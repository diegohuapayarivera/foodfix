import axios from "axios";
const getOrders = async () => {
  const url = "http://100.25.7.210:30007/order";
  const res = await axios.get(url);
  const orders = res.data;
  return orders;
}; 

export default getOrders;
