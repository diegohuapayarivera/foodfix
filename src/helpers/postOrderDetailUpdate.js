import axios from "axios";
const postOrderDetailUpdate = async (data) => {
  const url = "http://localhost:8001/order/updateOrderDetail";
  const res = await axios.post(url, data);
  const updateOrder = res.data;
  return updateOrder;
};

export default postOrderDetailUpdate;