import React, {useState} from "react";
import { redirect, Form } from "react-router-dom";


const newTrip = ({userId}) => {
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('')

    //add an id state

    const locationChange = (e) => {
        setLocation(e.target.value)
    }
    const dateChange = (e) => {
        setDate(e.target.value)
    }
    const typeChange = (e) => {
        setType(e.target.value)
    }

    // this functioin send a post request to the data base to grab the _id of
    // of the new trip that was created in the database and redirects the user
    // to the tripsHome page. From there you can add items and uers, etc with put/patch requests 
    const handleSubmit = (e) => {
        e.preventDefault();
        // post request to server
        fetch('/trips', {
            method: "POST",
            body: JSON.stringify({location: location, type: type, date: date, users:[userId]})
        })
        .then(res => res.json())
        .then((res) => {
            // this responses should have the _id of the new trips' database
            // id --> _id
            // reset the state of the page to force re-render
            setLocation('');
            setDate('');
            setType('');
            // grab the _id from the res
            const URL = '/trips/' + res.trip_id
            // redirect to the trips home page
            return redirect(URL);
        })
        .catch((err) => {
            console.log(err);
            alert('Failed To Submit')
        }); 
    }

// <Form method={} action={} onSubmit={handleSubmit}> 
    return (
        // *** QUESTION: is the action leading to the correct page?
        <Form onSubmit={handleSubmit}> 
            <label>
                <span>Where are you going?</span>
                <input type="text" value={location} name="location" onChange={locationChange}/>
            </label>
            <label>
                <span>When are you going?</span>
                <input type="text" value={date} name="date" onChange={dateChange}/>
            </label>
            <label>
                <span>What are you planning for?</span>
                <input type="text" value={type} name="location" onChange={typeChange}/>
            </label>
            <button type="submit">Create Trip!</button>
        </Form>

    )
};






export default newTrip;