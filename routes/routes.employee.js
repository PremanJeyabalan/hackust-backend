const Express = require('express');
const { createOrder, updateStatus, createItems, getAllItems, acceptOrder, getOrder, addPrice, getAvailableOrder } = require('../helpers/mongo');
const Customer = require('../models/Customer.model');
const Employee = require('../models/Employee.model');
const CustomerOrder = require('../models/CustomerOrder.model');
const EmployeeOrder = require('../models/EmployeeOrder.model');
let app = Express();

app.get('/order', async (req, res) => {
    const { employeeId } = req.body;
    try {
        const order = await getAvailableOrder();
        await updateStatus({Model: EmployeeOrder, id: order._id, status: 'accepted'});
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


app.post('/add', async (req, res) => {
    const { employeeList, orderId } = req.body;

    try {
        const result = await addPrice(employeeList, orderId);

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
});

app.post('/solve', async (req, res) => {
    const { orderId } = req.body;

    try {
        const order = getOrder(orderId);
        await updateStatus({Model: Customer, id: order.customerId, status: 'inactive'});
        await updateStatus({Model: Employee, id: order.employeeId, status: 'free'});
        await updateStatus({Model: CustomerOrder, id: orderId, status: 'solved'});

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