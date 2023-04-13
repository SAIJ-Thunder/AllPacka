const { Session } = require('../models');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `sessionController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
    message: { err: `Error occurred in sessionController.${method}. Check server logs for more details.` }
  };
};

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/


sessionController.isLoggedIn = (req, res, next) => {

  const { ssid } = req.cookies;
  // console.log(req.cookies)
  Session.findOne({ cookieId: ssid })
    .then(data => {
      // console.log('isLoggedIn data: ',data)
      // const time = Date.now() - data.createdAt;
      // if (time < 30)
      if (data) {
        return next()
      } else {
        res.redirect('/signup')
      }
    })
    .catch((err) => {
      return next(createErr({
        method: 'isLoggedIn',
        type: 'ERROR staying logged in',
        err,
      }));
    });
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  console.log('entered session ')
  // console.log(`res.locals in startSession:`, res.locals.user.username)
  //write code here
  try {
    Session.findOne({ cookieId: res.locals.user.user_id })
      .then(data => {
        console.log('data:', data)
        if (data) {
          Session.updateOne({ cookieId: res.locals.user.user_id }, { createdAt: Date.now() })
            .then((data) => {
              next();
            })

        }
        else {

          Session.create({
            cookieId: res.locals.user.user_id,
            username: res.locals.user.username

          })
          return next()

        }
      })
  }
  catch (err) {
    next(err)
  }





  // currSession.save()
  //   .then(data => {
  //     console.log('Session Saved: ', data)
  //     res.locals.sesh = data;
  //     return next();
  //   })
  //   .catch((err) => {
  //     return next(createErr({
  //       method: 'startSession',
  //       type: 'adding new session to mongoDB data',
  //       err,
  //     }));
  //   });
};

module.exports = sessionController;