const Express = require('express');
const bodyParser = require('body-parser');
const { createOrder, updateStatus, getAllItems, getAllActiveOrdersDistrict } = require('../helpers/mongo');
const { getTargetAndCustomerPrice } = require('../helpers/microservice');
const Customer = require('../models/Customer.model');
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
const { uniq } = require('lodash');
let app = Express.Router();
const catObject = {fruit : 0, veg: 1, poul: 2, dairy: 3, seafood: 4, cereals: 5, beverages: 6 } ;

app.use(Express.json());

app.post('/create', async (req, res) => {
    const {customerId, district, customerList} = req.body;

    try {
        const itemList = await getAllItems();
        const nameArray = customerList.map(item => {
            return item.name;
        });

        const order = await createOrder({customerId, district, customerList, customerPrice}, CustomerOrder);
        await updateStatus({status: 'active', id: customerId, Model: Customer});

        let categories = [[],[],[],[],[],[],[]];
        const orders = await getAllActiveOrdersDistrict(district);
        if (orders.length == 3){
            for (let i of orders) {
                for (let j in i.customerList){
                    categories[j.category].push({...j, orderId: i._id});
                }
            }

            for (let i of categories) {
                if (i.length > 0) {
                    // const employeeTargetPrice = await getTargetAndCustomerPrice({ itemList, nameArray: i});
                    const batchOrderIds = Array();
                    for (let j of i){
                        batchOrderIds.push(j.orderId);
                    }

                    batchOrderIds = uniq(batchOrderIds);
                    await createOrder({district, employeeTargetPrice, batchOrderIds}, EmployeeOrder);
                }
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