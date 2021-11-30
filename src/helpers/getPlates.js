import axios from "axios";
const getPlates = async () => {
  const url = "http://54.226.50.179:30007/order/plate";
  const res = await axios.get(url);
  const plates = res.data;
  return plates;
};

export default getPlates;
