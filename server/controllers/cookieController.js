
///////////// Stretch feature /////////////////
const cookieController = {};

/**
* setSSIDCookie - store the user's databasse _id in a cookie and seesion db
*/

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('res.locals.user.user_id in cookie', res.locals.user.user_id)
  console.log('entered cookieController.setSSIDCookie')
  res.setHeader('Set-Cookie', `ssid=${res.locals.user.user_id}; HttpOnly`); // <-- Example
  console.log('leaving cookie controller')

  return next();
}


module.exports = cookieController;