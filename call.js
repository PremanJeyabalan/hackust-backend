const axios = require('axios');

// const foodName = ["apple", "lettuce", "chicken" ];
// const foodType = ["fruit", "veg", "poul"];

// const customerList = foodName.map((value, index) => {
//     return({
//         itemId : foodName[index],
//         amount : 5,
//         type : "discrete",
//         category : foodType[index]

//     })
// })
// // 3 6075d2332ae36c2f6c7d9832 2 6075d22e2ae36c2f6c7d9831 1 6075d2282ae36c2f6c7d9830
// const full = {
//     customerId :"6075d2332ae36c2f6c7d9832",
//     district : "Mongkok",
//     customerList : customerList
// }


// axios.post("http://10.89.161.2:5000/customer/order/create", full).then(value => console.log(value)).catch(err => console.log(err));


const employeeList = [{
    _id: '6075e0e315b20c4eb8531ad9',
    itemId: 'apple',
    amount: 15,
    type: 'discrete',
    district: 'Mongkok',
    price: 25,
    employeeId: '60759340913c1765b800a079',
    storeId: '607594c4b77037675c395cff',
    category: 'fruit'
}]

const full = {
    employeeList: employeeList,
    employeeOrderId: '6075e0e315b20c4eb8531ad8'
}

axios.post("http://localhost:5000/employee/add", full).then(value => console.log(value)).catch(err => console.log(err));;


