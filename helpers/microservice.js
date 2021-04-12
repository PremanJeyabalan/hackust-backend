
const axios = require('axios');

async function getTargetAndCustomerPrice({nameArray, itemList}) {
    try {
        
        const response = await axios({
            method: 'post',
            url: `${algoMicroserviceURL}/target`,
            data: {
                nameArray,
                itemList
            }
        })

        return response.data;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getTargetAndCustomerPrice,
}