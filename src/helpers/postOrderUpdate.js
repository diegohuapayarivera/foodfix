import axios from "axios";
const postOrderUpdate = async (data) => {
  const url = "http://localhost:8001/order/updateOrder";
  const res = await axios.post(url, data);
  const updateOrder = res.data;
  return updateOrder;
};

export default postOrderUpdate;