const axios = require('axios');

const foodName = ["apple", "lettuce", "chicken" ];
const foodType = ["fruit", "veg", "poul"];

const customerList = foodName.map((value, index) => {
    return({
        itemId : foodName[index],
        amount : 5,
        type : "discrete",
        category : foodType[index]

    })
})
const full = {
    customerId :"60759d2f290db542acbc9de5",
    district : "Mongkok",
    customerList : customerList
}
axios.post("http://10.89.161.2:5000/customer/order/create", full).then(value => console.log(value)).catch(err => console.log(err));
