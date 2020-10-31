const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const dataset = require("./modules/dataset.js");

require('dotenv').config();

const morgan = require('morgan');
const cors = require('cors');
const uuidv1 = require('uuid/v1');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./modules/authDb.js');

/** **/
app.get("/api/buildings", (req, res)=>{
  res.status(200).send(dataset.prototype.getBuildings());
});
/** **/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Enable CORS in Node.js - Clue Mediator' });
});
app.listen(port, () => {
  console.log('Server started on: ' + port);
});


// login stuff

// register user
app.post('/users', async (req, res) => {
  try {
    const usersList = db.getAllUsers();
    const user = usersList.find(user => user.username == req.body.username);

    if (user != null)
      return res.status(400).send('Username already exists');

    const pass = req.body.password;
    const license = req.body.licenseKey;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const hashedLicenseKey = await bycript.hash(license, 10);
    const user = {
      username: req.body.username,
      password: hashedPassword,
      licenseKey: hashedLicenseKey
    };

    let validKey = db.getLicense(hashedLicenseKey);
    if (validKey)
      db.updateUsers(user);
    else
      res.status(404).send();

    res.status(201).send();
  }
  catch {
    res.status(500).send();
  }
});

// login user
app.post('/users/login', async (req, res) => {
  // Authenticate User
  const usersList = db.getAllUsers();
  const user = usersList.find(user => user.username == req.body.username);

  if (user == null)
    return res.status(400).send('User not found');

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).send('Authentication succeeded')
    }
    else
      res.status(401).send('Wrong password');
  }
  catch {
    res.status(500).send();
  }
});