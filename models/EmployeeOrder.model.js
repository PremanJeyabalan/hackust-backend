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
    enum: ['created', 'accepted', 'solved'],
    default: 'created'
}

const EmployeeOrderModel = new Schema({
    employeeId: {...optionsString, required: false},
    district: optionsString,
    batchOrderIds: { type: [String],  required: true},
    employeeTargetPrice: {...optionsNumber, required: false},
    employeeList: [new Schema({}, {strict: false})],
    status: optionsEnumType,
}, {timestamps: true})


module.exports = mongoose.model('EmployeeOrder', EmployeeOrderModel);