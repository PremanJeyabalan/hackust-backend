require('dotenv').config()

const MongoDBName = `${process.env.MONGODB_NAME}`;
const MongoURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`
const algoMicroserviceURL = `${process.env.ALGO_MICRO_IP}`

module.exports = {
    MongoDBName,
    MongoURL,
    algoMicroserviceURL
}