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

const CustomerModel = new Schema({
    name: optionsString,
    currentOrder: optionsString
})


module.exports = mongoose.model('Customer', CustomerModel);