
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


// CREATE USER
userController.createUser = (req, res, next) => {
  console.log('---We are in createUser in userController.js--');

  const { username, password } = req.body; // verification will hash the password in DB
  
  const newUser = new User({ username, password });

  newUser.save()
    .then(savedUser => {
        if (savedUser === null) {
            return next(createErr({
                method: 'createUser',
                type: 'adding newUser to mongoDB data',
                err: `The attempt to save ${username} to users collection returned null`
                }));
        }
        const { username } = savedUser;
        res.locals.user = { username }; // removed sending password back, wouldn't want that unless you've got another thought in mind
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

// Thinking of switching to findOne using username for security purposes. They're unique anyways
// GET USER
userController.getUser = (req, res, next) => {
  console.log('---We are in getUser in userController.js--');

  const { _id } = req.params; // 

  User.findOneById(_id)
    .then(foundUser => {

      if (foundUser === null) {
        return next(createErr({
            method: 'addUser',
            type: 'retrieving mongoDB user data',
            err: `findOneById(${_id}) returned null`
        }));
      }

      const { username, trips } = foundUser;
      res.locals.user = { username, trips };
      return next();
    })
    .catch((err) => {
      return next(createErr({
        method: 'getUser',
        type: 'retrieving mongoDB user data',
        err, 
      }));
    });
}

// Verify User
userController.verifyUser = async (req, res, next) => {
  console.log('---We are in getUser in userController.js--');

  const { username, password } = req.body; // 

  if (username === undefined || password === undefined) {
    next(createErr({
      method: 'verifyUser',
      type: 'getting user data from request body',
      err: 'userName and/or password weren\'t in req.body',
    }));
  }

  try {
    const foundUser = await User.findOne({ username, password }).exec();

    if (foundUser === null) {
      res.locals.verified = false;
    } else {
      res.locals.verified = true;
      const { username, trips } = foundUser;
      res.locals.user = { username, trips };
    }
      
    return next();
    
  } catch (err) {
    return next(createErr({
      method: 'getUser',
      type: 'retrieving mongoDB user data',
      err,
    }));
  }
}

// UPDATE USER TRIPS
//Accounts for cases:
  //1. 

  //2. The user has just made a trip using createTrip and we'd like to add that trip to the user's trip list.
  //  user_id and trip_id are stored on res.locals 
  //   

userController.updateUserTrips = async (req, res, next) => {
  console.log('---We are in updateUserTrips in userController.js--');

  const { user_id } = req.body || res.locals || {user_id : undefined};
  const { trip_id } = res.body || res.locals || {trip_id : undefined}; // grab the trip
  const { date } = res.body.date || res.locals.trip.date  // grabs date of trip
  const { tripName } = res.body.tripName || res.locals.trip.tripName // grabs the name of the trip
 
  const filter = user_id; // 

  try {
    // find the user based on the Id
    const foundUser = await User.findOneById(filter)

    if (foundUser === null) {
      return next(createErr({
          method: 'updateUserTrips',
          type: 'retrieving mongoDB user data',
          err: `findOneById(${user_id}) returned null`
      }));
    }

    // grab user's trips array
    const { trips } = foundUser;
    // update user trips with the newly created trip (last middleware)
    trips = [...trips, { tripName: tripName, date: date, id: trip_id}];
    // update the databasse witht the new trips array
    const update = { trips: trips }

    const updatedUser = await User.findByIdAndUpdate( filter, update, {new:true})
    
    if (updatedUser === null) {
      return next(createErr({
          method: 'updateUserTrips',
          type: 'retrieving mongoDB user data',
          err: `findByIdAndUpdate(${filter}) returned null`
      }))
    }
    
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

/* Commenting out until adapted to our data

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
*/