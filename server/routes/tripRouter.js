
const express = require('express');

const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');
const sessionController = require('../controllers/sessionController');
const cookieController = require('../controllers/cookieController')

const router = express.Router();

// get a trip's info
router.get('/:_id',
    // middleware,
    (req, res) => {
    console.log('--Sending data from tripRouter.GET\'s aynonmouns func--');
    return res.status(200).json(); //
    }
);

// save a new trip
router.post('/',
  // middleware,
  (req, res) => {
    console.log('--Sending data from tripRouter.POST\'s aynonmouns func--');
    return res.status(200).json(); // 
  }
);

// update the trip's information
router.patch('/:_id',
  // middleware
  (req, res) => {
    console.log('--Sending data from tripRouter.PATCH\'s aynonmouns func--');
    return res.status(200).json(); //
  }
);

// delete a trip : (
router.delete('/:_id',
  // middleware,
  (req, res) => {
    console.log('--Sending data from tripRouter.DELETE\'s aynonmouns func--');
    return res.status(200).json(); // 
  }
);

// EXPORT THE ROUTER!!!
module.exports = router;