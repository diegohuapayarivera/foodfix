import axios from "axios";
const getPlates = async () => {
  const url = "http://localhost:8001/order/plate";
  const res = await axios.get(url);
  const plates = res.data;
  return plates;
};

export default getPlates;
