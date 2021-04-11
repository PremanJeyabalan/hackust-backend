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
    enum: ['solved', 'active', 'accepted'],
    default: 'active'
}

const OrderModel = new Schema({
    customerId: optionsString,
    employeeId: {...optionsString, required: false},
    latitude: { required: true, type: Number},
    longitude: { required: true, type: Number},
    employeeTargetPrice: {...optionsNumber, required: false},
    customerPrice: optionsNumber,
    customerList: [new Schema({}, {strict: false})],
    employeeList: [new Schema({}, {strict: false})],
    status: optionsEnumType,
}, {timestamps: true})


module.exports = mongoose.model('Order', OrderModel);

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