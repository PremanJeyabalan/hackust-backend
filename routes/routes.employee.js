const Express = require('express');
const { createOrder, updateStatus, createItems, getAllItems, acceptOrder, getOrder, getAvailableOrder, updateEmployeeOrder, updateEmployeeList, solveCustomerOrder } = require('../helpers/mongo');
const Customer = require('../models/Customer.model');
const Employee = require('../models/Employee.model');
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
let app = Express();

app.get('/order', async (req, res) => {
    const { employeeId } = req.body;
    try {
        const order = await getAvailableOrder();
        // const employeeTargetPrice = await cheeseeeeeeeeeeeeeeeeeeeeeee()
        await updateEmployeeOrder(order._id, {employeeId, status: 'accepted'});
        await updateStatus({status: 'busy', id: employeeId, Model: Employee});

        await updateStatus({Model: CustomerOrder, id: order.batchOrderIds[0], status: 'accepted'});
        const customer = await getOrder(order.batchOrderIds[0]);
        await updateStatus({Model: Customer, id: customer.customerId, status: 'accepted'});

        if (order.batchOrderIds.length > 1) {
            await updateStatus({Model: CustomerOrder, id: order.batchOrderIds[1], status: 'accepted'});
            const customer = await getOrder(order.batchOrderIds[1]);
            await updateStatus({Model: Customer, id: customer.customerId, status: 'accepted'});
        }

        if (order.batchOrderIds.length > 2) {
            await updateStatus({Model: CustomerOrder, id: order.batchOrderIds[2], status: 'accepted'});
            const customer = await getOrder(order.batchOrderIds[2]);
            await updateStatus({Model: Customer, id: customer.customerId, status: 'accepted'});
        }

        const result = await getOrder(order._id, EmployeeOrder);

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
}) //READY FOR TEST


app.post('/add', async (req, res) => {
    const { employeeOrderId, employeeList } = req.body;

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

    try {
        const order = await getOrder(employeeOrderId);

        await updateStatus({Model: EmployeeOrder, id: employeeOrderId, status: 'solved'});
        for (let id of order.batchOrderIds){
            await solveCustomerOrder(id);
        }
        
        const result = await updateStatus({Model: Employee, id: order.employeeId, status: 'free'});
        await createItems(result.employeeList);


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