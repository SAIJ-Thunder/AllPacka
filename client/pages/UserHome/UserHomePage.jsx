import React, { useState } from 'react';
import { redirect, Form } from 'react-router-dom';

// Child Components
import userTripsDisplay from './userTripsDisplay';

const UserHomePage = () => {
    const [joinTripCode, setJoinTripCode] = useState('');
    const [tripsArray, setTripsArray] = useState(null)
     

    // where do I input the userId from rootLayout and update the setCurrentTrips
    const handleCreateTrip = (e) => {
        e.preventDefault();
        return redirect('/NewTripPage');
    }
    const handleJoinTrip = (e) => {
        e.preventDefault();
        console.log('not built out yet');
        //patch
        //TODO make functionality in backend lol
        // const URL = '/trips/' + res.trip_id;
        // return redirect(URL);
    }

    return (
        <div className="user-home-page">
            <div className='create-trip'>
                <button onClick={handleCreateTrip}>Create New Trip</button>
            </div>
            <div className='join-trip'>
                <input type="text" value={joinCode} onChange={(e) => setJoinTripCode(e.target.value)} />
                <button onClick={handleJoinTrip}>Join Trip</button>
            </div>
            <div className='current-trips'>
                <h2>Currently Planning</h2>
                {/* TODO: Render list of currently planning trips */}
            </div>
            <div className='past-trips'>
                <h2>Past Trips</h2>
                    <userTripsDisplay/>
            </div>
        </div>
    )
}


export default UserHomePage;