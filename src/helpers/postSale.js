import axios from 'axios';
const postSale = async (data) => {
    const url = 'http://3.90.213.95:30007/order/savesale'
    const res = await axios.post(url, data)
    const sale = res.data
    return sale
}

export default postSale