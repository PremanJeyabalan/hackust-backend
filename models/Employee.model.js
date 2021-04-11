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

const EmployeeModel = new Schema({
    name: optionsString,
    stars: optionsNumber,
    currentOrder: optionsString
})

module.exports = mongoose.model('Employee', EmployeeModel);

