import axios from "axios";
const getPlates = async () => {
  const url = "http://3.90.213.95:30007/order/plate";
  const res = await axios.get(url);
  const plates = res.data;
  return plates;
};

export default getPlates;
