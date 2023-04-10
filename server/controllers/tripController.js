
const { Trip, Item, User } = require('../models.js');


// helper function to create fileController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return { 
      log: `tripController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
      message: { err: `Error occurred in tripController.${method}. Check server logs for more details.` }
    };
};


const tripController = {};


// Get a trip's data
tripController.getTrip = (req, res, next) => {
    console.log('---We are in getTrip in tripController.js--');

    const { trip_id } = req.params; // 

    Trip.findById(trip_id)
      .then(foundTrip => {
        //checks to see that trip was successfully found. If trip_id didn't match a trip in the database
        //it'll return null but it won't throw an error, the promise status will be fulfilled, not rejected
        if (foundTrip === null) {
          return next(createErr({
              method: 'getTrip',
              type: 'retrieving Trip mongoDB data',
              err: `findById(${trip_id}) returned null`
          }));
        }

        const { 
          tripName, location,
          tripType, date, items,
          users, catagories, review,
          photos, id } = foundTrip

        res.locals.trip = { 
          tripName, location,
          tripType, date, items,
          users, catagories, review,
          photos, id };

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

// create a new trip
tripController.createTrip = (req, res, next) => {
  console.log('---We are in tripCharacter in characterController.js--');
  const { user_id } = req.params

  const {
    location,
    type,
    date,
    tripName,
    } = req.body; 
  
  // to be used in next peice of middleware
  res.locals.user_id = user_id
      
  const newTrip = new Trip({location, type, date, tripName, users: {user_id: user_id} });

  newTrip.save()
      .then(savedTrip => {
        res.locals.trip_id = savedTrip._id.toString(); // used for updating the user's trips array (next middleware)
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
  // return next();
};

// Stretch Feature
// Only the current user that is logged in can join a trip.
// They join a trip by adding a trip to there trip array
tripController.updateTripUsers = async (req, res, next) => {
  console.log('---We are in updateTripUsers in tripController.js--');

  const { user_id } = req.body;

  if (res.body.updateUser) {
    const { trip_id } = res.params;  // grab the trip
    const filter = trip_id;

    try {
      // find the user based on the Id
      const foundTrip = await Trip.findById(filter)
      //checks to see that trip was successfully found. If trip_id didn't match a trip in the database
      //it'll return null but it won't throw an error, the promise status will be fulfilled, not rejected
      if (foundTrip === null) {
        return next(createErr({
            method: 'updateTripUsers',
            type: 'retrieving Trip before updated mongoDB data',
            err: `findById(${trip_id}) returned null`
        }));
      }

      foundTrip.users.push({ user_id: user_id });
      const updatedTrip = await foundTrip.save();

      if (updatedTrip === null) {
        return next(createErr({
          method: 'updateTripUsers',
          type: 'updating Trip mongoDB data',
          err: `foundTrip.save(${trip_id}) returned null`
      }));
      }

/*
      // grab user's trips array
      const { users } = foundTrip;
      // update trip with the newly created trip (last middleware)
      users = [...users, { id: user_id }];
      // update the databasse witht the new trips array
      const update = { users: users }

      const updatedTrip = Trip.findOneAndUpdate({ _id: filter }, update, { new: true })
*/

      res.locals.updatedTrip = updatedTrip;      
      return next();
    } catch (err) {
      return next(createErr({
        method: 'updateTripUsers',
        type: 'adding newUser to mongoDB data',
        err,
      }));
    }
  } else return next();
}


//So this is kind the worst, but I want to get us to the point where we can actually use the app by showtime.
// feel free to do this the less risky way by updating one property at a time after everything else is working.
// https://www.mongodb.com/docs/manual/reference/operator/update/

//Tested and it works!
tripController.updateTripDetails = async (req, res, next) => {

  const { trip_id, trip } = req.body

  const filter = { _id: trip_id };
  const update = trip;

  try {
    const replacedTrip = await Trip.findOneAndReplace(filter, update, { upsert: true, new: true })
  
    if (replacedTrip === null) {
      return next(createErr({
        method: 'updateTripDetails',
        type: 'retrieving and updating Trip mongoDB data',
        err: `ffindOneAndReplace(${trip_id}) returned null`
    }));
    }
    
    res.locals.replacedTrip = replacedTrip;
    return next();
    
  } catch (err) {
    return next(createErr({
      method: 'updateTripDetails',
      type: 'updating Trip to mongoDB data',
      err, 
      }));
  }
}

  // I started looking at this and there's actually some complicated syntax needed to achieve this
  // functionality including update operators. As we're essentially replacing any item that has different
  // information, I wrote a function above called updateTripDetails that replaces the entire trip document.
  // Much faster for engineers on a time crunch, and we'll be manipulating a copy of the trip document in the 
  // frontend anyway. Might as well just send the altered version back and save ourselves some time until
  // we get everything else working.

//TODO Do we even need an items schema? Why not just save the items "schema" to the trips. It's not
// nested beyond that one array and reduces the need for updating a database. It's not like we are 
// reusing the items in any other trip!

//I'm in! We don't really need to save an items array on users either. If all of the items sit on trip
// then those items get provided a username when a user clicks on it, we could just iterate over the 
// item array on trip to make user cards

// We still need to update the trip's items. Which would necessitate the patch, but no outside db updates

tripController.updateTripItems = async (req, res, next) => {
  console.log('---We are in updateTripItems in tripController.js--');
  // updatedItems will be a boolean
  if (res.body.updateItems) {
    // grab new items from body -> tripItems is an array
    const { tripItems } = res.body; 
    const { trip_id } = req.body;

    // Next on my fix list, my uncommented code below won't work with what I figured out. 
    // db arrays can't be replaced without replacing whole document.

    //So here's a problem: with delayed saves and no websocket, our site really only supports
    // one person editing the list at a time.
    //Scenario of events occuring in chronological order: 
    // 1. Person A opens site, site serves them the current state of the trip from the database.
    // 2. Person B opens the site and gets the current state of the database.
    // 3. Person A makes changes and saves. 
    // 4. Person B makes changes and saves.
    //None of Person A's changes will be shown  because the database will be updated to 
    // the state of Person B's list because they saved second.
    
    // This isn't a problem for our simple site though. The problem won't come about, but the functionality of updating trip items is
    // pretty fundemental for a trip planner. If you want to make editting the trip page to be a websocket, it would be really easy to 
    // do. We just use a websocket in the /trip/edit/:trip_id page, any updates that any person makes on this page is sent out to db. 
    
    // Note you don't want to to be updating the trip db from a websocket though. There is still a need to have a submit button. 

    const filter = trip_id;
  
    try {
      // find the user based on the Id
      const foundTrip = await Trip.findById(filter)
      // // grab trip's items array
      const { items } = foundTrip;

      // const updatedItems = [...items];

      // for (let items of tripItems) {

      //   if (!(item in items)){
      //     // save item to item schema
      //     const savedItem = await items.updateOne(
      //                                 { name: item.name ,
      //                                   number: item.number,
      //                                   priority: item.priority,
      //                                   catagory: item.catagory,
      //                                   user: { // which user is bringing the item default 'null' until claimed
      //                                     username: String,
      //                                     id: {
      //                                       type: Schema.Types.ObjectId,
      //                                       ref: 'user',
      //                                     }
      //                                   }
      //                                 },
      //                                 { upsert: true });
        
      //   // once it's saved, push it to the trip's item array
      //   updatedItem.push(savedItem) // NOTE - makes me wonder if we even need an item schema??? Should we just save this within the trips?
      //   }

      // }
      // filter = {tripName: tripName};
      // const update = {items : updatedItems }
   
      // const updatedTripItems = await Trip.findByIdAndUpdate(filter, update, { new: true })

      // // update trip with the newly created trip (last middleware)
      // // update the databasse witht the new trips array
      // const updates = { users: users }

      // const updatedTrip = Trip.findOneAndUpdate({ _id: filter }, updates, { new: true })
      
      const filter = trip_id;
      const update = { items: tripItems };
      //finds trip by Id and replaces items array with array sent from 
      const updatedTrip = await Trip.findByIdAndUpdate(filter, update, { new: true })

      //checks to see that trip was successfully found. If trip_id didn't match a trip in the database
      //it'll return null but it won't throw an error, the promise status will be fulfilled, not rejected
      if (updatedTrip === null) {
        return next(createErr({
            method: 'getTrip',
            type: 'retrieving Trip mongoDB data',
            err: `findOneById(${trip_id}) returned null`
        }));
      }

      res.locals.updatedTrip = updatedTrip;
      return next();
    } catch (err) {
      return next(createErr({
        method: 'updateTripUsers',
        type: 'adding newItems to mongoDB data',
        err,
      }));
    }
  } else return next();
}




// TODO
 // ADD MIDDLEWARE TO DELETE TRIP
tripController.deleteTrip = (req, res, next) => {
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

// EXPORT THE Controllers!!!
module.exports = tripController;