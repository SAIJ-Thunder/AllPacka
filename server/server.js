const path = require('path');
const express = require('express');


const userRouter = require('./routes/user.js');
const tripRouter = require('./routes/trip.js');
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); // important for forms!!



// define route handlers 
app.use('/', userRouter);

app.use('/trips', tripRouter);




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