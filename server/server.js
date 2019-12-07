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

app.get('/auth', cookieController.cookieController, (req, res) => {
  res.status(200);
  return res.json(res.locals);
});

app.post('/auth', authController.checkAuthentication, cookieController.cookieController, (req, res) => {
  res.status(200);
  return res.json(res.locals);
});

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
