const axios = require('axios');
const CustomerOrderModel = require('./models/CustomerOrder.model');
const { emptyCollection, getOrder } = require('./helpers/mongo');
const EmployeeOrderModel = require('./models/EmployeeOrder.model');

const foodName = ["apple", "lettuce", "chicken" ];
const foodType = ["fruit", "veg", "poul"];



const customerList = foodName.map((value, index) => {
    return({
        itemId : index,
        amount : 5,
        type : "discrete",
        category : foodType[index],
    })
})
// 3  2  1 
// const full = {
//     customerId :"6075d2332ae36c2f6c7d9832",
//     district : "Mongkok",
//     customerList : customerList
// }

customerIds = ['607734506680d272b8f69e83', '6077345a6680d272b8f69e84', '6077345e6680d272b8f69e85'];
// const initDB = async () => {
//     // await emptyCollection(CustomerOrderModel);
//     // await emptyCollection(EmployeeOrderModel);
//     let i = 2;
//     setTimeout(() => {
//         axios.post("http://localhost:8000/customer/order/create", {...full, customerId: customerIds[i++]}).then(value => console.log(value)).catch(err => console.log(err));
//     }, 1)
// }


const initDB = async () => {
    const employeeList = [
        {
            itemId: 0,
            amount: 15,
            type: 'discrete',
            district: 'Mongkok',
            category: 'fruit',
            price: 25,
            employeeId: '6076f6ccddc1145c187de178',
            storeId: '6076f50446b1b73a7073014c',
            suggestedStoreId: '6076f50446b1b73a7073014c',
            targetPrice: 3.9660122547904684
        }
    ]

    const full = {
        employeeList: employeeList,
        employeeOrderId: '607884ec46393361c43a5ee5'
    }

    axios.post("http://localhost:8000/employee/add", full).then(value => console.log(value)).catch(err => console.log(err));

}


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


