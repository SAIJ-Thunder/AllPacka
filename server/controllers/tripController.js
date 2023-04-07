
const { Trips, Items } = require('./tripModel.js');

const tripController = {};


characterController.createTrip = (req, res, next) => {
    console.log('---We are in tripCharacter in characterController.js--');
    const { 
        location, type,
        date, items,
        users, review,
        photos } = req.body; 
    
    const newTrip = { 
            location, type,
            date, items,
            users, review,
            photos};

    res.locals.newTrip = newTrip;
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