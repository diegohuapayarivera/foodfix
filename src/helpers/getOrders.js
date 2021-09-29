import axios from 'axios'

const getOrders = async () => {
    const url = "http://localhost:8080/api/orders/"
    const res = await axios.get(url)
    const orders = res.data
    return orders
};

export default getOrders;
