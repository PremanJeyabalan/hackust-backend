const Express = require('express');
const bodyParser = require('body-parser');
const { createOrder, updateStatus, getAllItems } = require('../helpers/mongo');
const Customer = require('../models/Customer.model');
const Employee = require('../models/Employee.model');
let app = Express.Router();

app.use(bodyParser.json());

app.post('/create', async (req, res) => {
    const {customerId, latitude, longitude, customerList} = req.body;

    try {
        const itemList = await getAllItems();
        const nameArray = customerList.map(item => {
            return item.name;
        });
        // const {employeeTargetPrice, customerPrice} = await callCheeseAlgo({nameArray, itemList})
        console.log(customerList);
        console.log(nameArray);

        //temp
        const customerPrice = 10;
        //

        const order = await createOrder({customerId, latitude, longitude, customerList, customerPrice});
        await updateStatus({status: 'active', id: customerId, Model: Customer});
            

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