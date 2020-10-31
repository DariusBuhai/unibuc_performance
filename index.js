const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const dataset = require("./modules/dataset.js");

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
