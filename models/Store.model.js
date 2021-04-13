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

const StoreModel = new Schema({
    name: optionsString,
    stars: optionsNumber,
    district: optionsString
})


module.exports = mongoose.model('Store', StoreModel);