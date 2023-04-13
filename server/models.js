const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

// Each user has a user name, password, and an array of trips
// Stretch thought: User documents should include nicknames. That way if Mark is already in database, my name doesn't need to be "Mark6" on website
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  trips: [{
    date: Date,
    tripName: String, // the is the name the user decides, not the name of the trip (default should is trip name)
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: 'trip',
    }
  }]
});


// before saving password in database, encrypt the password
userSchema.pre('save', function (next) {
  // call the hash function, passing in the password, salt factor, and error first callback
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hashedPassword) => {
    if (err) return next(err);
    this.password = hashedPassword;
    return next();
  })
})





const User = mongoose.model('User', userSchema);




// item: {id, itemName:xxxx, quantity:xxx, assignedTo:xxxx }
//category: {name:xxx, items: [item, item, item ]}  // [{id, itemName:xxxx, quantity:xxx, assignedTo:xxxx }, {id, itemName:xxxx, quantity:xxx, assignedTo:xxxx }]




// ORIGINAL TRIP SCHEMA

// Users could also have a ninkname per trip? Food for thought.
// Somehow we forgot to have start and end dates lol
// const tripSchema = new Schema({
//   tripName: String,
//   location: { type: String, required: true },
//   tripType: String, // example: car camping backpacking, etc These can later be refactored to their own schema but int he interest in time... -|_:)_/-
//   date: { type: Date, required: true }, // not sure if there is a date type, look into
//   users: [{
//     user_id: {
//       type: Schema.Types.ObjectId,
//       ref: 'user'
//     }
//   }], // default categories = []
//   categories: {
//     default: [],
//     type: [{
//       name: { type: String, required: true }, items: {
//         type: [{
//           quantity: Number,
//           itemName: { type: String, required: true },
//           assignedTo: String
//         }],
//       }
//     }]
//   }
// });

// NEW TRIP SCHEMA TO ADD INFO TO A SINGLE TRIP
// ACTUAL SCHEMA BELOW
const tripSchema = new Schema({
  tripName: {type: String},
  categories: {
    type:
    {
      food: [{ quantity: Number, assignedTo: String, itemName: String }],
      drinks: [{ quantity: Number, assignedTo: String, itemName: String }],
      snacks: [{ quantity: Number, assignedTo: String, itemName: String }]
    },
    default: { food: [], drinks: [], snacks: [] }
  }
})
const Trip = mongoose.model('trip', tripSchema);








/*

Will add this structure to trip items after more testing

// Every item only holds One user. The user that user has a ref
// to the userSchema
const itemSchema = new Schema({
  name: String, // name of the item
  number: Number, // how many we are bringing
  priority: Boolean, // stretch feature (how needed is the item)
  catagory: String, // This will be used to parse the DB data for displaying against the trip's catagories Array
  user: { // which user is bringing the item default 'null' until claimed
    username: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }
})

const Item = mongoose.model('item', itemSchema);
*/
///////////////// Stretch Features ///////////////////////
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 600, default: Date.now },
  username: { type: String, required: true }
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = {
  Trip,
  // Item,
  User,
  Session
}