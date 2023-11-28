var express = require('express');
var app = express();
var cors = require('cors');

var dal = require('./dal.js');

// serve static files from public
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function(req, res){
    dal.create(req.params.name, req.params.email, req.params.password)
    .then((user)=>{
        console.log(user);
        res.send(user);
    });
});

// login user
app.get('/account/login/:email/:password', function(req,res){
    dal.login(req.params.email, req.params.password)
    .then((docs)=>{
        console.log(docs);
        res.send(docs);
    });
});


// all accounts
app.get('/account/all', function(req,res){
    dal.all()
    .then((docs)=>{
        console.log(docs);
        res.send(docs);
    });
});

// balance
app.get('/account/balance/:email', function(req,res){
    setTimeout(dal.getBalance(req.params.email),1000)
    .then((data)=>{
        console.log(data);
        res.send(data);
    });
});

// deposit
app.get('/account/transaction/:email/:amount', function(req,res){
    dal.transaction(req.params.email, req.params.amount)
    .then((data)=>{
        console.log(data);
        res.send(data);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: '+ port);
