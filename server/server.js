const path = require('path');
const express = require('express');

// Routers
const userRouter = require('./routes/user.js');
const tripRouter = require('./routes/trip.js');


const PORT = 3000;
const app = express();


// Parse all requests
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); // important for forms!!


// define route handlers 
// from Signup component -> auth routes to '/user/_id'
app.use('/', userRouter); // from Signup component -> auth routes to '/user/_id'

app.use('/signup', userRouter); // from Signup component -> auth routes to '/user/_id'

app.use('/user/:_id', userRouter) // Access to trips from here


app.use('/trips/:_id', tripRouter); // The main infographic page


// catch-all route handler for any requests to an unknown route
app.use((req,res) => res.sendStatus(404));


app.use((err, req, res, next) => {
    // this is the default error obj
    console.log('We have entered the twightlight Zone!');
    res.locals.message = err.message;
    console.log('Our error message is: ', err.message);
    const errorStatus = err.status || 500;
    return res.status(errorStatus).send(res.locals.message);
  });



  //  start server
app.listen(PORT, () => {
    console.log(`Beep boop: Server listening on port: ${PORT}`);
  });