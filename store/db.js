//const mongoClient = require('mongodb').MongoClient;

var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
require('dotenv').config();
const CONNECTION_STRING = process.env.DB; 
client = null;
let mongodb;

function connect(done){

  MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (err, client) => {
    client=client
    if(err) {
        console.log('Database error: ' + err);
        done(err);
    } else {
        console.log('Successful database connection');
        mongodb = client.db('test');
        done();
    }
  });
}

function get(){
    if (mongodb===null) {
      console.log('Trying to get uninitialized DB');
      return null;
    }else{
      return mongodb;
    }
}

function close(){
    if (client) client.close();
}

module.exports = {
    connect,
    get,
    close
};


