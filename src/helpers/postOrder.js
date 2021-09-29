import axios from 'axios';
const postOrder = async (data = {}) => {
  const url = "http://localhost:8080/api/orders/order";
  /*const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: data,
  });
  const order = await res.json();
  return order;*/
  const res = await axios.post(url, data)
  const plate = res.data
  return plate
};

export default postOrder;
