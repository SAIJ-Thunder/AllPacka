
const { User, Trip } = require('./tripModel.js');


const userController = {};

characterController.createUser = (req, res, next) => {
    console.log('---We are in createCharacter in userController.js--');
    const { username, password, trips  } = req.body; 
    
    const newUser = { 
                username,
                password,
                trips,
                }

    res.locals.newUser = newUser;
    return next();
};


// ADD MIDDLEWARE TO DELETE USER
characterController.deleteTrip = (req, res, next) => {
    console.log('---We are in deleteUser in userController.js----');
    const { _id } = req.params; // always, always, always destructure for security reasons!!!
    console.log(_id);
    res.locals.deleteId = _id;
    return next();
};