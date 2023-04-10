
const express = require('express');

const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController.js');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController')


const router = express.Router();

// get a trip's info
router.get('/:_id', tripController.getTrip,
  (req, res) => {
  console.log('--Sending data from tripRouter.GET\'s aynonmouns func--');
  return res.status(200).json('test');
  }
);
 
// save a new trip
// this :_id is the user's _id
router.post('/:user_id',
  tripController.createTrip,
  userController.updateUserTrips,
  (req, res) => {
    console.log('--Sending data from tripRouter.POST\'s aynonmouns func--');
    //res.locals keys
    //  -trip -> trip data from createTripPage (for loading on tripHomePage details)
    //  -updatedUser -> with updated user trips array
    //  -user_id -> user who created trip
    //  -trip_id -> the current trip_id (for redirect)
    return res.status(200).json(res.locals); // 
  }
);





// // delete a trip : (
// router.delete('/:trip_id',
// tripController.deleteTrip,
//   (req, res) => {
//     console.log('--Sending data from tripRouter.DELETE\'s aynonmouns func--');
//     return res.status(200).json(); // 
//   }
// );

// EXPORT THE ROUTER!!!
module.exports = router;