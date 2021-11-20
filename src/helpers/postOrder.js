import axios from 'axios';
const postOrder = async (data) => {
  const url = "http://localhost:8001/order";
  const res = await axios.post(url, data)
  const order = res.data
  return order
};

export default postOrder;
