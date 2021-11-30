import axios from "axios";
const postOrderUpdate = async (data) => {
  const url = "http://54.226.50.179:30007/order/updateOrder";
  const res = await axios.post(url, data);
  const updateOrder = res.data;
  return updateOrder;
};

export default postOrderUpdate;