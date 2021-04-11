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
    latitude: { required: true, type: Number},
    longitude: { required: true, type: Number}
})


module.exports = mongoose.model('Store', StoreModel);