
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