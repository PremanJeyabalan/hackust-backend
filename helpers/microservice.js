
const axios = require('axios');
const { algoMicroserviceURL } = require('../config');

async function getTargetPrice(order) {
    try {
        console.log(order);
        const response = await axios.post(`${algoMicroserviceURL}/test`, {...order});
        console.log(response.data);
        return response.data;
    } catch (e) {
        throw e;
    }
}

async function getCustomerPrice(){
    try {
        const response = await axios.get(`${algoMicroserviceURL}/test`);
        console.log(response.data)
        return response.data;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getCustomerPrice,
}