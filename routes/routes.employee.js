const Express = require('express');
const axios = require('axios')
const { createOrder, updateStatus, createItems, getAllItems, acceptOrder, getOrder, getAvailableOrder, updateEmployeeOrder, updateEmployeeList, solveCustomerOrder } = require('../helpers/mongo');
const Customer = require('../models/Customer.model');
const Employee = require('../models/Employee.model');
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
let app = Express();

app.get('/order', async (req, res) => {
    const { employeeId } = req.query;
    try {
        const order = await getAvailableOrder();
        await updateEmployeeOrder(order[0]._id, {employeeId: employeeId, status: 'accepted'});
        await updateStatus({status: 'busy', id: employeeId, Model: Employee});

        for (each of order){
            each = JSON.stringify(each)
            each = JSON.parse(each)
            for (id of each.batchOrderIds){
                await updateStatus({Model: CustomerOrder, id: id, status: 'accepted'});
                const customer = await getOrder(id);
                console.log(customer);
                await updateStatus({Model: Customer, id: customer.customerId, status: 'accepted'});
            }
        }
        

        const result = await getOrder(order[0]._id, EmployeeOrder);

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})


app.post('/add', async (req, res) => {
    const { employeeOrderId, employeeList } = req.body;
    console.log(req.body)
    try {
        const result = await updateEmployeeList(employeeList, employeeOrderId);

        res.status(200).json({
            success: true,
            data: result
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
}); //READY FOR TEST

app.post('/solve', async (req, res) => {
    const { employeeOrderId } = req.body;
    console.log(req.body)
    try {
        const order = await getOrder(employeeOrderId, EmployeeOrder);
        await updateStatus({Model: EmployeeOrder, id: employeeOrderId, status: 'solved'});


        await solveCustomerOrder(order._id);
        
        const result = await updateStatus({Model: Employee, id: order.employeeId, status: 'free'});
        
        await createItems(order.employeeList);


        res.status(200).json({
            success: true,
            data: result
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})

module.exports = app;