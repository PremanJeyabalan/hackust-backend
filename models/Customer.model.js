const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionsString = {
    type: String,
    required: true
}

const optionsEnumType = {
    type: String,
    required: true,
    enum: ['accepted', 'active', 'inactive'],
    default: 'inactive'
}

const optionsNumber = {
    type: Number,
    required: true
}

const CustomerModel = new Schema({
    name: optionsString,
    status: optionsEnumType
})


module.exports = mongoose.model('Customer', CustomerModel);