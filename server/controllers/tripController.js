
const { Trips, Items, Users } = require('./model.js.js.js');


// helper function to create fileController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return { 
      log: `userController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in userController.${method}. Check server logs for more details.` }
    };
};

const tripController = {};


tripController.getTrip = (req, res, next) => {
    console.log('---We are in getTrip in userController.js--');

    const { _id } = req.params; // 

    User.findOneById(_id)
      .then(trip => {
        const { 
            location, type,
            date, items,
            users, review,
            photos } = trip

        res.locals.trip = { 
            location, type,
            date, items,
            users, review,
            photos };

        return next();
      })
      .catch((err) => {
        return next(createErr({
          method: 'getTrip',
          type: 'retrieving Trip mongoDB data',
          err, 
        }));
      });
}

characterController.createTrip = (req, res, next) => {
    console.log('---We are in tripCharacter in characterController.js--');

    const { 
        location, type,
        date, items,
        users, review,
        photos } = req.body; 

    
    const newTrip = new User({location, type,
                            date, items,
                            users, review,
                            photos});

    newTrip.save()
        .then(newTrip => {
            res.locals.trip = newTrip; // grabs the _id and send to new URL
            return next();
        })
        .catch((err) => {
            return next(createErr({
            method: 'addTrip',
            type: 'adding newTrip to mongoDB data',
            err, 
            }));
        });


    return next();
};



 // ADD MIDDLEWARE TO DELETE TRIP
characterController.deleteTrip = (req, res, next) => {
    console.log('---We are in deleteTrip in tripController.js----');
    const { _id } = req.params; // always, always, always destructure for security reasons!!!
    console.log(_id);
    res.locals.deleteId = _id;
    return next();
};






userController.getUser = (req, res, next) => {
    console.log('---We are in getUser in userController.js--');

    // const { _id } = req.params; // 

    User.findOne({/** parames here */})
      .then(student => {
        const { firstName, lastName, age } = student;
        res.locals.student = { firstName, lastName, age };
        return next();
      })
      .catch((err) => {
        return next(createErr({
          method: 'getCharacters',
          type: 'retrieving mongoDB data',
          err, 
        }));
      });
}


// ADD MIDDLEWARE TO CREATE USER
userController.createUser = (req, res, next) => {
    console.log('---We are in createUser in userController.js--');

    const { username, password, trips } = req.body; 
    const newUser = new User({ username, password, trips });

    newStudent.save()
        .then(newUser => {
            const { username, password, trips } = newUser;
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


// ADD MIDDLEWARE TO DELETE USER
userController.deleteUser = (req, res, next) => {
    console.log('---We are in deleteUser in userController.js----');

    const { _id } = req.params; 
    console.log(_id);

    User.findOneAndDelete({_id: _id})
      .then(student => {
        console.log(student);
        const { firstName, lastName, age } = student;
        res.locals.student = { firstName, lastName, age };
        return next();
      })
      .catch((err) => {
        return next(createErr({
          method: 'deleteStudent',
          type: 'retrieving mongoDB data',
          err, 
        }));
      });
};