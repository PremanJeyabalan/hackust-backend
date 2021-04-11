const Express = require('express');
const { createOrder, updateStatus, createItems, getAllItems, acceptOrder, getOrder, addPrice, getAvailableOrders } = require('../helpers/mongo');
const Customer = require('../models/Customer.model');
const Employee = require('../models/Employee.model');
const Order = require('../models/Order.model');
let app = Express();

app.get('/orders', async (req, res) => {
    try {
        const orders = await getAvailableOrders();

        res.status(200).json({
            success: true,
            data: orders
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})

app.post('/accept', async (req, res) => {
    const { orderId, employeeId } = req.body;

    try {
        const result = await acceptOrder(orderId, employeeId);

        await updateStatus({status: 'busy', id: employeeId, Model: Employee});
        await updateStatus({Model: Order, id: orderId, status: 'accepted'});
        await updateStatus({Model: Customer, id: order.customerId, status: 'approved'});

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
        await updateStatus({Model: Order, id: orderId, status: 'solved'});

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