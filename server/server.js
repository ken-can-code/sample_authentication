const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const authController = require('./auth_controllers');
const cookieController = require('./cookie_controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(express.static(path.resolve(__dirname, '../views')));
app.use(express.static(path.resolve(__dirname, '../client')));

// couple simple route handlers
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// runs on page load to check if you already have ssid cookie
// returns isLoggedIn true or false and username if isLoggedIn is true
app.get('/auth', cookieController.cookieController, (req, res) => {
  res.status(200);
  return res.json(res.locals);
});

// posts username and password to compare on backend to determine isLoggedIn
app.post('/auth', authController.checkAuthentication, cookieController.cookieController, (req, res) => {
  res.status(200);
  return res.json(res.locals);
});

// catch all if no routes are hit, returns default 404 status
app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
