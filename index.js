const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 3000;

const dataset = require("./modules/dataset.js");
//const prediction = require("./modules/prediction.js");

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

/** simplify paths **/
app.get("/model", (req, res)=>{
  res.sendFile(__dirname+"/static/model.html");
});
app.get("/login", (req, res)=>{
  res.sendFile(__dirname+"/static/login.html");
});
app.get("/register", (req, res)=>{
  res.sendFile(__dirname+"/static/register.html");
});


/** building api **/
app.get("/api/buildings", async (req, res)=>{
  res.send(await dataset.prototype.getBuildings());
});
app.get("/api/building/:id", async (req, res)=>{
  res.send(await dataset.prototype.getBuilding(req.params.id));
});

/** register stuff */
app.post('/api/register', async (req, res) => {
  const usersList = await dataset.prototype.getAllUsers();
  console.log(usersList);
  let user = usersList.find(user => user.username == req.body.username);
  if (user != null)
    return res.status(400).send('Username already exists');
  const pass = req.body.password;
  const license = req.body.license;
  const hashedPassword = await bcrypt.hash(pass, 10);
  user = {
    id: uuidv1(),
    username: req.body.username,
    password: hashedPassword,
  };
  let validKey = await dataset.prototype.getLicense(license);
  console.log(validKey);
  if (validKey)
    await dataset.prototype.addUsers(user);
  else
    res.status(401).send();
  res.status(200).send();
});

/** login stuff */
app.post('/api/login', async (req, res) => {
  const usersList = await dataset.prototype.getAllUsers();
  const user = usersList.find(user => user.username == req.body.username);
  if (user == null)
    return res.status(400).send('User not found');
  if (await bcrypt.compare(req.body.password, user.password))
    res.status(200).send(user.id)
  else
    res.status(401).send('Wrong password');
});

app.get('/api/balls/:id', async (req, res) => {
  res.status(200).send(await dataset.prototype.getBalls(req.params.id));
});

app.post('/api/events', async (req, res) => {
  if (!req.body.user_id) {
    res.status(404).send();
  }

  res.status(200).send(await dataset.prototype.insertEvent(req.body.event));
});

app.post('/api/balls', async (req, res) => {
  if (!req.body.user_id) {
    res.status(404).send();
  }

  res.status(200).send(await dataset.prototype.insertBall(req.body.ball));
});

/** chart */
app.get('/api/chart/:id', async(req, res) => {
  res.send(await dataset.prototype.getEventByHour(req.params.id));
});

/** prediction */
app.get('/api/prediction/:id', async(req, res) => {
  res.send(await dataset.prototype.makePrediction(req.params.id));
});
