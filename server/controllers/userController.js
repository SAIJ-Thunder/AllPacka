
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


// GET USER
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


// CREATE USER
userController.createUser = (req, res, next) => {
  console.log('---We are in createUser in userController.js--');

  const { username, password } = req.body; // verification will hash the password in DB
  
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

// UPDATE USER TRIPS
userController.updateUserTrips = async (req, res, next) => {

  console.log('---We are in updateUserTrips in userController.js--');

 
  const { trip_id } = res.locals;  // grab the trip
  const { date } = res.locals.date
  const { tripName } = res.locals.trip // grabs the name of the trip
  const filter = res.locals.user_id;
  
  try {
    // find the user based on the Id
    const user = await User.findOneById(filter)
    // grab user's trips array
    const { trips } = user;
    // update user trips with the newly created trip (last middleware)
    trips = [...trips, { tripName: tripName, date: date, id: trip_id}];
    const update = { trips: trips }

    const updatedUser = User.findOneAndUpdate( {_id: filter}, update, {new:true})
    res.locals.updatedUser = updatedUser;
    return next();
  } catch (err) {
    return next(createErr({
      method: 'updateUserTrips',
      type: 'adding newUser to mongoDB data',
      err, 
      }));
  }
}


// DELETE USER
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