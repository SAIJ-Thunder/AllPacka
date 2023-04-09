const express = require('express');

const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController')

const router = express.Router();

// save a new user
router.post('/signup',
  userController.createUser,
  (req, res) => {
    console.log('--Sending data from userRouter.POST\'s aynonmouns func--');
    return res.status(200).json(res.locals.user); // Send newCharacter Data
  }
);

//verify login info
router.post('/login',
    userController.verifyUser,
    (req, res) => {
    console.log('--Sending data from userRouter.GET\'s aynonmouns func--');
    return res.status(200).json(res.locals); //res.locals.userData
    }
);

// get a user's info
router.get('/:_id',
    userController.getUser,
    (req, res) => {
    console.log('--Sending data from userRouter.GET\'s aynonmouns func--');
    return res.status(200).json(); //res.locals.userData
    }
);



// // update the trip's information
// router.patch('/:_id',
//   // middleware
//   (req, res) => {
//     console.log('--Sending data from userRouter.PATCH\'s aynonmouns func--');
//     return res.status(200).json(); //
//   }
// );

// delete user
router.delete('/:_id',
  userController.deleteUser,
  (req, res) => {
    console.log('--Sending data from charaRouter.DELETE\'s aynonmouns func--');
    return res.status(200).json(res.locals.deletedCharacter); // We need to send back the updated character's object (so the client can re-render)
  }
);

// EXPORT THE ROUTER!!!
module.exports = router;