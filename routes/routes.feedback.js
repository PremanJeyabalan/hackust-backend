const Express = require('express');
const { createFeedback, updateStars } = require('../helpers/mongo');
const Employee = require('../models/Employee.model');
const Item = require('../models/Item.model');
const Store = require('../models/Store.model');

let app = Express();

app.post('/create', async (req, res) => {
    const { feedback } = req.body;

    try {
        const result = await createFeedback({feedback});
        
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