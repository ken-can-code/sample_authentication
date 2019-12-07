
// checks on page load if you already have the cookie 'ssid'
// or checks if isLoggedIn is already true
// if you have cookie, sets isLoggedIn to true
// if isLoggedIn is true, sets cookie with ssid/username
// if you have neither, does nothing, isLoggedIn remains false
const cookieController = (req, res, next) => {
  if (req.cookies.ssid !== undefined) {
    res.locals.isLoggedIn = true;
    res.locals.username = req.cookies.ssid;
  } else if (res.locals.isLoggedIn) {
    res.cookie('ssid', res.locals.username);
  }
  return next();
};

module.exports = {
  cookieController,
};
