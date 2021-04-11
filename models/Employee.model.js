const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsString = {
    type: String,
    required: true
}

const optionsNumber = {
    type: Number,
    required: true,
    default: 0
}

const optionsEnumType = {
    type: String,
    required: true,
    enum: ['free', 'busy'],
    default: 'free'
}

const EmployeeModel = new Schema({
    name: optionsString,
    stars: optionsNumber,
    currentOrder: optionsEnumType
})

module.exports = mongoose.model('Employee', EmployeeModel);

