import axios from 'axios';
const postSale = async (data) => {
    const url = 'http://54.226.50.179:30007/order/savesale'
    const res = await axios.post(url, data)
    const sale = res.data
    return sale
}

export default postSale