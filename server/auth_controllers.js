
// checks hardcoded password and sets isLoggedIn to true only if both match
const checkAuthentication = (req, res, next) => {
  const { username, password } = req.body;
  if (username === 'castle' && password === 'password123') {
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
