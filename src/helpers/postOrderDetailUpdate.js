import axios from "axios";
const postOrderDetailUpdate = async (data) => {
  const url = "http://54.226.50.179:30007/order/updateOrderDetail";
  const res = await axios.post(url, data);
  const updateOrder = res.data;
  return updateOrder;
};

export default postOrderDetailUpdate;