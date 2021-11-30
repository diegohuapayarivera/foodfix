import axios from "axios";
const postOrderUpdate = async (data) => {
  const url = "http://3.90.213.95:30007/order/updateOrder";
  const res = await axios.post(url, data);
  const updateOrder = res.data;
  return updateOrder;
};

export default postOrderUpdate;