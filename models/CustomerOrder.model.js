const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsString = {
    type: String,
    required: true
}

const optionsNumber = {
    type: Number,
    required: true
}

const optionsEnumType = {
    type: String,
    required: true,
    enum: ['created', 'batched', 'accepted', 'solved'],
    default: 'created'
}

const CustomerOrderModel = new Schema({
    customerId: optionsString,
    district: optionsString,
    employeeTargetPrice: {...optionsNumber, required: false},
    customerPrice: {...optionsNumber, required: false},
    customerList: [new Schema({}, {strict: false})],
    status: optionsEnumType,
}, {timestamps: true})


module.exports = mongoose.model('CustomerOrder', CustomerOrderModel);

/*
customerList schema:
[
    {
        name/id
        amount
        type (kg, g, discrete)
    }, 
]

employeeList schema:
[
    {
        name/id
        amount
        type (kg, g, discrete)
        price
    }
]
*/