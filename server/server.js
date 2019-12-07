const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get(express.static(path.resolve(__dirname, '/views')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/loggedIn.html'));
});

app.post('auth', (req, res) => {
  res.status(200);
  res.redirect('/secret');
});

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
