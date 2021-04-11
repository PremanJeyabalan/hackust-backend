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

const FeedbackModel = Schema({
    customerId: optionsString,
    target: optionsString,
    stars: optionsNumber
})

module.exports = mongoose.model('Feedback', FeedbackModel);