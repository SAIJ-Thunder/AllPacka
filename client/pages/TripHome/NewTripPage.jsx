import React, {useState} from "react";
import { redirect, Form } from "react-router-dom";

//Will have access to userId
const newTrip = () => {
//     const [date, setDate] = useState('');
//     const [location, setLocation] = useState('');
//     const [tripType, setTripType] = useState('');
//     const [tripName, setTripName] = useState('');

//     // this functioin send a post request to the data base to grab the _id of
//     // of the new trip that was created in the database and redirects the user
//     // to the tripsHome page. From there you can add items and uers, etc with put/patch requests 
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // post request to server
//         fetch(`/trips/:${userId}`, {
//             method: "POST",
//             body: JSON.stringify({location: location, tripType: tripType, date: date, tripName: tripName})
//         })
//         .then(res => res.json())
//         .then((res) => {
//             // this responses should have the _id of the new trips' database
//             // id --> _id
//             // reset the state of the page to force re-render
//             setLocation('');
//             setDate('');
//             setTripType('');
//             setTripName('');
//             // grab the _id from the res -> also has
            
//             //FixURL
//             const URL = '/TripHomePage' + res.trip_id
            
        //invoke prop drilled setCurrentTrip, pass in trip object

            // redirect to the trips home page
            return redirect(URL);
        })
        .catch((err) => {
            console.log(err);
            alert('Failed To Create Trip');
        }); 
    };

// <Form method={} action={} onSubmit={handleSubmit}> 
    return (
        // *** QUESTION: is the action leading to the correct page?
        <Form onSubmit={handleSubmit}>
            <label>
                <span>Where are you going?</span>
                <input type="text" value={location} name="location" onChange={setLocation(e.target.value)}/>
            </label>
            <label>
                <span>When are you going?</span>
                <input type="text" value={date} name="date" onChange={setDate(e.target.value)}/>
            </label>
            <label>
                <span>What are you planning for?</span>
                <input type="text" value={tripType} name="tripType" onChange={setTripType(e.target.value)}/>
            </label>
            <label>
                <span>What will you call this Epic Adventure?</span>
                <input type="text" value={tripName} name="tripName" onChange={setName(e.target.value)}/>
            </label>
            <button type="submit">Create Trip!</button>
        </Form>
    );
};

export default newTripPage;