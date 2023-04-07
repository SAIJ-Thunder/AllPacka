

const express = require('express');



const userController = require('../controllers/userController');
const tripController = require('../controllers/tripController');


const router = express.Router();

// get a trip's info
router.get('/:id',
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
    return res.status(200).json(res.locals.newCharacter); // Send newCharacter Data
  }
);

// update the trip's information
router.patch('/:id',
  characterController.updateCharacter,
  fileController.saveCharacter,
  (req, res) => {
    console.log('--Sending data from tripRouter.PATCH\'s aynonmouns func--');
    return res.status(200).json(res.locals.updatedCharacter); // We need to send back the updated character's updated object (not just to updates ;)
  }
);

// delete a trip : (
router.delete('/:id',
  // middleware,
  (req, res) => {
    console.log('--Sending data from tripRouter.DELETE\'s aynonmouns func--');
    return res.status(200).json(res.locals.deletedCharacter); // We need to send back the updated character's object (so the client can re-render)
  }
);

// EXPORT THE ROUTER!!!
module.exports = router;