const Express = require('express');
const { createPerson, createStore } = require('../helpers/mongo');
const Customer = require('../models/Customer.model');
const Employee = require('../models/Employee.model');
let app = Express.Router();

app.post('/create/employee', async (req, res) => {
    console.log(req.body);
    const {name} = req.body;

    try {
        const person = await createPerson(name, Employee);

        res.status(200).json({
            success: true,
            data: person
        })
    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})

app.post('/create/customer', async (req, res) => {
    const {name} = req.body;

    try {
        const person = await createPerson(name, Customer);

        res.status(200).json({
            success: true,
            data: person
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})

app.post('/create/store', async (req, res) => {
    const { name, district } = req.body;

    try {
        const store = await createStore({name, district });

        res.status(200).json({
            success: true,
            data: store
        })

    } catch (e) {
        res.status(e.code || 500).json({
            success: false,
            error: e.message
        })
    }
})


module.exports = app;