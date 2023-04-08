
const { Trip, Item, User } = require('../models.js');


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

    Trip.findOneById(_id)
      .then(trip => {
        const { 
          location, type,
          date, items,
          users, catagories, review,
          photos } = trip

        res.locals.trip = { 
          location, type,
          date, items,
          users, catagories, review,
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
      location,
      type,
      date, 
      users, 
      } = req.body; 

    const newTrip = new Trip({location, type, date, users});

    newTrip.save()
        .then(savedTrip => {
          res.locals.trip_id = savedTrip.id // used for updating the user's trips array (next middleware)
          res.locals.trip = savedTrip; // grabs the _id and send to new URL
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

    const { _id } = req.params;

    Trip.findByIdAndDelete(_id)
    .then(trip => {
      const { 
          location, type,
          date, items,
          users, catagories, review,
          photos } = trip

      res.locals.trip = { 
          location, type,
          date, items,
          users, catagories, review,
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
};

