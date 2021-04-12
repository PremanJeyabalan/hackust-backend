require('dotenv').config()

const MongoDBName = '';
const MongoURL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${MONGODB_URI}`

module.exports = {
    MongoDBName,
    MongoURL
}