const userList = require('../userlist');

// checks against required userlist object and sets isLoggedIn to true only if both match
const checkAuthentication = (req, res, next) => {
  const { username, password } = req.body;
  if (userList[username] !== undefined && userList[username] === password) {
    res.locals.username = username;
    res.locals.isLoggedIn = true;
    return next();
  }
  res.locals.isLoggedIn = false;
  return next();
};

module.exports = {
  checkAuthentication,
};
