import axios from 'axios';
const postOrder = async (data) => {
  const url = "http://54.226.50.179:30007/order";
  const res = await axios.post(url, data)
  const order = res.data
  return order
};

export default postOrder;
