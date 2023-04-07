
///////////// Stretch feature /////////////////
const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  // console.log(res.locals._id);
  res.setHeader('Set-Cookie', `ssid=${res.locals._id}; HttpOnly`); // <-- Example
  return next();
}

module.exports = cookieController;