
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
