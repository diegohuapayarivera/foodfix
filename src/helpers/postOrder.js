import axios from 'axios';
const postOrder = async (data) => {
  const url = "http://3.90.213.95:30007/order";
  const res = await axios.post(url, data)
  const order = res.data
  return order
};

export default postOrder;
