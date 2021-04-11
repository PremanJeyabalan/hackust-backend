const mongoose = require('mongoose')
const { MongoURL, MongoDBName } = require('../config')
const Order = require('../models/Order.model');
const Customer = require('../models/Customer.model');
const Item = require('../models/Item.model');
const Store = require('../models/Store.model');
const FeedbackModel = require('../models/Feedback.model');

async function createOrder(data) {
    try {

        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const order = Order.save({...data});

        const result = await order.save().then(doc => {return doc})

        await mongoose.connection.close()

        return result;

    } catch (e) {
        throw e;
    }

}

async function updateStatus({status, id, Model}) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Model.findByIdAndUpdate(id, {$set: {currentOrder: status}});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createItems(customerList) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        const result = Array();

        for (let item of customerList) {
            const doc = Item({...item});
            result.push(await doc.save().then(doc => {return doc})); 
        }

        await mongoose.connection.close();

        return result

    } catch (e) {
        throw e;
    }
}

async function getAllItems() {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Item.find({});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function acceptOrder(orderId, employeeId) {
    try {

        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Order.findByIdAndUpdate(orderId, {$set: {employeeId, status: 'accepted'}});

        await mongoose.connection.close();

        return result;

    } catch (e) {
        throw e;
    }
}

async function getOrder(orderId) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const result = await Order.findById(orderId);
        
        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}

async function addPrice(employeeList, orderId){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        const order = await getOrder(orderId);

        const empList = {...order.employeeList, employeeList};
        const result = await Order.findByIdAndDelete(orderId, {$set: {employeeList: empList}});

        await mongoose.connection.close();

        return result
    } catch (e) {
        throw e;
    }
}

async function getAvailableOrders() {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const orders = await Order.find({status: 'active'});

        await mongoose.connection.close();

        return orders;
    } catch {
        throw e;
    }
}

async function createPerson(name, Model) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const person = Model({...name});
        const result = await person.save().then(doc => {return doc});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createStore({name, latitude, longitude}) {
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const store = Store({name, latitude, longitude});
        const result = await store.save().then(doc => {return doc});

        await mongoose.connection.close();

        return result;
    } catch (e) {
        throw e;
    }
}

async function createFeedback({ customerId, target, stars }){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })

        const feedback = Feedback({customerId, target, stars });
        const result = await feedback.save().then(doc => {return doc});

        await mongoose.connection.close();
        return result;
    } catch (e) {
        throw e;
    }
}

async function updateStars({ id, Model }){
    try {
        await mongoose.connect(MongoURL, {
            useUnifiedTopology: true,   
            useNewUrlParser: true,
            dbName: MongoDBName 
        })
        let score = 0;
        const feedbacks = await Feedback.find({target: id});
        let count = feedbacks.length;

        for (let feedback of feedbacks){
            score += feedback.stars
        }

        score = score / count

        const result = await Model.findByIdAndUpdate(id, {$set: {stars: score}});

        await mongoose.connection.close();
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = {
    createOrder,
    updateStatus,
    createItems,
    getAllItems,
    acceptOrder,
    getOrder,
    addPrice,
    getAvailableOrders,
    createPerson,
    createStore,
    createFeedback,
    updateStars
}