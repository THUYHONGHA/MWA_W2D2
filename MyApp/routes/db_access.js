// Retrieve
var MongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017/MWAE08";

let connectDB = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(dbUrl, function(err, db) {
            if (err) {
                console.log('Connect db error!');
                reject(err);
            } else {
                console.log('Connect db success!');
                resolve(db);
            }
        });
    });
};
module.exports = connectDB;