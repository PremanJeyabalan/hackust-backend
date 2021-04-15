const axios = require('axios');
const CustomerOrderModel = require('./models/CustomerOrder.model');
const { emptyCollection, getOrder } = require('./helpers/mongo');
const EmployeeOrderModel = require('./models/EmployeeOrder.model');

const foodName = ["apple", "lettuce", "chicken" ];
const foodType = ["fruit", "veg", "poul"];



const customerList = foodName.map((value, index) => {
    return({
        itemId : index,
        itemName: foodName[index],
        amount : 5,
        type : "discrete",
        category : foodType[index],
        targetPrice: 23
    })
})
// 3  2  1 
const full = {
    customerId :"6075d2332ae36c2f6c7d9832",
    district : "Mongkok",
    customerList : customerList
}

customerIds = ['607734506680d272b8f69e83', '6077345a6680d272b8f69e84', '6077345e6680d272b8f69e85'];
const initDB = async () => {
    await emptyCollection(CustomerOrderModel);
    await emptyCollection(EmployeeOrderModel);
    let i = 0 ;
    setTimeout(() => {
        axios.post("http://localhost:8000/customer/order/create", {...full, customerId: customerIds[i++]}).then(value => console.log(value)).catch(err => console.log(err));
    }, 1)
}


// const initDB = async () => {
//     const employeeList = [
//         {
//             itemId: 'chicken',
//             amount: 15,
//             type: 'discrete',
//             district: 'Mongkok',
//             price: 25,
//             employeeId: '6077347f6680d272b8f69e86',
//             storeId: '6077349b6680d272b8f69e88',
//             category: 'poul'
//         }
//     ]

//     const full = {
//         employeeList: employeeList,
//         employeeOrderId: '6077503af4755b50dc416815'
//     }

//     axios.post("http://localhost:5000/employee/add", full).then(value => console.log(value)).catch(err => console.log(err));

// }


async function main() {
    await initDB();
}



main();
// const employeeList = [{
//     _id: '6075e0e315b20c4eb8531ad9',
//     itemId: 'apple',
//     amount: 15,
//     type: 'discrete',
//     district: 'Mongkok',
//     price: 25,
//     employeeId: '60759340913c1765b800a079',
//     storeId: '607594c4b77037675c395cff',
//     category: 'fruit'
// }]

// const full = {
//     employeeList: employeeList,
//     employeeOrderId: '6075e0e315b20c4eb8531ad8'
// }

// axios.post("http://localhost:5000/employee/add", full).then(value => console.log(value)).catch(err => console.log(err));;


