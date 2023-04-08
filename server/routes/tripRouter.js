
const express = require('express');

const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');


const router = express.Router();

// get a trip's info
router.get('/:_id',
    // middleware,
    (req, res) => {
    console.log('--Sending data from tripRouter.GET\'s aynonmouns func--');
    return res.status(200).json(); //res.locals.userData
    }
);

// save a new trip
router.post('/',
  // middleware,
  (req, res) => {
    console.log('--Sending data from tripRouter.POST\'s aynonmouns func--');
    return res.status(200).json(); // Send newCharacter Data
  }
);

// update the trip's information
router.patch('/:_id',
  // middleware
  (req, res) => {
    console.log('--Sending data from tripRouter.PATCH\'s aynonmouns func--');
    return res.status(200).json(); // We need to send back the updated character's updated object (not just to updates ;)
  }
);

// delete a trip : (
router.delete('/:_id',
  // middleware,
  (req, res) => {
    console.log('--Sending data from tripRouter.DELETE\'s aynonmouns func--');
    return res.status(200).json(); // We need to send back the updated character's object (so the client can re-render)
  }
);

// EXPORT THE ROUTER!!!
module.exports = router;