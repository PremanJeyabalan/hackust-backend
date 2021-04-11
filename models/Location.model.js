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

const LocationModel = new Schema({
    latitude: optionsNumber,
    longtitude: optionsNumber
})


module.exports = mongoose.model('Location', LocationModel);