const MongoClient = require('mongodb').MongoClient;
const url =  'mongodb+srv://doadmin:hn51oqD7rP042J39@db-mongodb-nyc3-16516-534d4f3a.mongo.ondigitalocean.com/users?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-16516';

let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, function(err,client){
    console.log('Connected!');

    //database Name
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    // console.log('name: '+ name);
    // console.log('email: '+ email);
    // console.log('password: '+ password);
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, role:'user'};
        collection.insertOne(doc, {w:1}, function(err, result){
            err ? reject(err): resolve(doc);
        });
    });
};

// all users
function all(){
    return new Promise((resolve,reject)=>{
        const customers = db   
            .collection('users')
            .find({})
            .toArray(function(err, docs){
                err ? reject(err): resolve(docs);
            });
    });
};

// login
function login(email, password){
    return new Promise((resolve,reject)=>{
        const customers = db   
            .collection('users')
            .find({ $and: [{email:email},{password:password}]})
            .toArray(function(err, docs){
                err ? reject(err): resolve(docs);
            });
    });
};

// balance
function getBalance(email){
    return new Promise((resolve,reject)=>{
        const customers = db   
            .collection('users')
            .find({email:email})
            .toArray(function(err, docs){
                err ? reject(err): resolve(docs);
            });
    });
};

// deposit + withdraw
function transaction(email, amount){
    return new Promise((resolve,reject)=>{
        const customers = db   
            .collection('users')
            .updateOne(
                {email:email},
                {$inc: {balance: Number(amount)}}
            )
    });
};

module.exports = {create, all, getBalance, transaction, login};
