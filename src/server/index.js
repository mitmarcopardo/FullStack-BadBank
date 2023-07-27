/* eslint-disable no-unused-vars */

import express from "express";
import cors from 'cors';
import * as dal from './dal_local.js' 


//const express = require('express');
//const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());

//////////// ------------- Create User with DAL

app.get('/account/create/:name/:email/:password/:sudo', function (req, res){
    // else create user
    const dalf = dal.createUser(req.params.name, req.params.email, req.params.password, req.params.sudo)
    .then( (user) => {
        console.log('on port 3001!', req.params.sudo);
        console.log(user);
        res.send(user);
    } );
});



// login user
app.get('/account/login/:email', function (req, res){
    const dalf = dal.login(req.params.email)
    .then((doc) => {
        console.log('login ', doc);
        res.send(doc);
    })
    .catch((error) => console.error("Error:", error));
});

// search user
app.get('/account/search/:email', function (req, res){
    const dalf = dal.search(req.params.email)
    .then((doc) => {
        console.log('search ', doc);
        res.send(doc);
    })
    .catch((error) => console.error("Error:", error));
});

// Deposit n whitdraw
app.get('/account/update/:email/:balance', function (req, res){
    // else create user
    const dalf = dal.update(req.params.email, req.params.balance)
    .then( (user) => {
        console.log(user);
        res.send(user);
    } );
});


// Balance
app.get('/account/balance/:email', function (req, res){
    // else create user
    const dalf = dal.balance(req.params.email)
    .then( (user) => {
        console.log(user);
        res.send(user);
    } );
});


// All
app.get('/account/all', function (req, res){
    const dalf = dal.all()
    .then( (docs) => {
        console.log(docs);
        res.send(docs);
    });
});

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});


app.listen(3001, () => {
  console.log("Server listening on port", 3001);
});