const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const SALT_WORK_FACTOR = 12;


const Schema = mongoose.Schema;

// Each user has a user name, password, and an array of trips
const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  trips: [{
      name: String, // the is the name the user decides, not the name of the trip (default should is trip name)
      id: {
        type: Schema.Types.ObjectId,
        ref: 'trip', 
      }
    }]
});

/////////// Stretch Feature /////////////////

// The pre() method should be called on the Mongoose schema 
// before creating the model!!

// userSchema.pre('save', async function (next) {
  
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }
//     // generates a random salt value that is used to hash a password
//     const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

const User = mongoose.model('User', userSchema);

const tripSchema = new Schema({
  location: String,
  type: String, // example: car camping backpacking, etc These can later be refactored to their own schema but int he interest in time... -|_:)_/-
  date: String, // not sure if there is a date type, look into
  items: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'item'
    }
  }], // This is an array of the objects with the item as the key and the person(s) bring it the value
  users: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  }], // this is an array of use _id's refrencing the user schema
  catagories: Array,
  review: String, // Could be comments. Possibly an array 
  photos: Array, // urls of photos stretch feature
});

const Trip = mongoose.model('trip', tripSchema);

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


///////////////// Stretch Features ///////////////////////
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 600, default: Date.now }
});


const Session = mongoose.model('Session', sessionSchema);

module.exports = {
  Trip,
  Item,
  User,
  Session
}