
const axios = require('axios');
const { algoMicroserviceURL } = require('../config');
const querystring = require('querystring');

async function getTargetPrice(order) {
    try {
        console.log({...order});
        const response = await axios.post(`${algoMicroserviceURL}/test`, querystring.stringify({...order}), {headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
        }});
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
    getTargetPrice
}