
const { User, Trip, Session } = require('./models.js');

const userController = {};

// helper function to create fileController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return { 
      log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
    };
};


userController.getUser = (req, res, next) => {
    console.log('---We are in getUser in userController.js--');

    const { _id } = req.params; // 

    User.findOneById(_id)
      .then(user => {
        const { username, trips } = user;
        res.locals.user = { username, trips };
        return next();
      })
      .catch((err) => {
        return next(createErr({
          method: 'getUser',
          type: 'retrieving mongoDB data',
          err, 
        }));
      });
}


// ADD MIDDLEWARE TO CREATE USER
userController.createUser = (req, res, next) => {
  console.log('---We are in createUser in userController.js--');

  const { username, password } = req.body; 
  
  const newUser = new User({ username, password });

    newUser.save()
        .then(user => {
            const { username, password } = user;
            res.locals.user = { firstName, lastName, age };
            return next();
        })
        .catch((err) => {
            return next(createErr({
            method: 'addUser',
            type: 'adding newUser to mongoDB data',
            err, 
            }));
        });
};


userController.addTrip = (req, res, next) => {

  console.log('---We are in createUser in userController.js--');

  const { _id } = req.params; // User's Id
  const { trips_id } = res.locals;  // grab the trip
  
  const filter = { _id: _id};
  const update = {trips: trips}

  User.findOneAndUpdate(filter, update, {
    new: true
  })
    .then(user => {
        const { trips } = user; // This will have the trip schema's _id
        res.locals.user = { trips };
        return next();
    })
    .catch((err) => {
        return next(createErr({
        method: 'addTrip',
        type: 'adding newTrip to mongoDB data',
        err, 
        }));
    });

}


// ADD MIDDLEWARE TO DELETE USER
userController.deleteUser = (req, res, next) => {
    console.log('---We are in deleteUser in userController.js----');

    const { _id } = req.params; 
    console.log(_id);

    User.findByIdAndDelete(_id)
      .then(student => {
        console.log(student);
        const { firstName, lastName, age } = student;
        res.locals.student = { firstName, lastName, age };
        return next();
      })
      .catch((err) => {
        return next(createErr({
          method: 'deleteUser',
          type: 'retrieving mongoDB data',
          err, 
        }));
      });
};