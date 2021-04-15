const Express = require('express');
const bodyParser = require('body-parser');
const { createOrder, updateStatus, getAllItems, getAllActiveOrdersDistrict, updateEmployeeOrder } = require('../helpers/mongo');
const { getCustomerPrice } = require('../helpers/microservice');
const Customer = require('../models/Customer.model');
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
const { uniq } = require('lodash');
const { createBatch } = require('../helpers/batch');
let app = Express.Router();
const catObject = {fruit : 0, veg: 1, poul: 2, dairy: 3, seafood: 4, cereals: 5, beverages: 6 } ;

app.use(Express.json());

app.post('/order/create', async (req, res) => {
    const {customerId, district, customerList} = req.body;

    try {

        // for (item of customerList) {
        //     const result = await getCustomerPrice(item);
        //     item = result;
        // }

        await createOrder({customerId, district, customerList}, CustomerOrder);
        const order =  await updateStatus({status: 'active', id: customerId, Model: Customer});

        let categories = [[],[],[],[],[],[],[]];
        let batchOrderIds = [[],[],[],[],[],[],[]];
        let customerBatchIds = [[],[],[]]
        const orders = await getAllActiveOrdersDistrict(district);
        console.log(orders);

        if (orders.length == 3){
            orders.map((order, i) => {
                order = JSON.stringify(order)
                order = JSON.parse(order);
                order.customerList.forEach((item, j) => {
                    categories[catObject[item.category]].push(item);
                    batchOrderIds[catObject[item.category]].push(order._id);
                })
            })

            
            
            for (let i of batchOrderIds){
                i = uniq(i);
            }

            categories = createBatch(categories, district);

            for (let i = 0; i < categories.length; i++) {
                if (categories[i].length > 0) {
                    const result = await createOrder({district, employeeList: categories[i], batchOrderIds: batchOrderIds[i]}, EmployeeOrder);
                    batchOrderIds[i].map((batch, index) => {
                        for (let j = 0; j < 3; j++){
                            if (batch.includes(orders[j]._id)){
                                customerBatchIds[j].push(result._id)
                            }
                        }
                        
                    })
                }
            }

            for (let i = 0; i < 3; i++){
                await updateEmployeeOrder(orders[i]._id, {customerBatchIds: customerBatchIds[i]}, CustomerOrder);
            }

            for (let i of orders){
                await updateStatus({Model: CustomerOrder, id:i._id, status: 'batched'})
            }

        }     

        res.status(200).json({
            success: true,
            data: order
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})

module.exports = app;


console.log("balls") //DO NOT DELETE


/*
    [
        {
            name
            employeePrice
            customerPrice
        }
    ] 
*/


