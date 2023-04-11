/*
This page is has some functionality! If a user logs in on the login page and already has trips in their trips array, 
they will successfully populate those trips in tripsArray in the functional components return statement. So far the 
only way to create trips on a user is postman though. The backend does actually work to do this.
Clicking the "Let's Go" button should save that trip to the global context "currentTrip" at this point, but
I didn't have time to test. 
*/


import React, { useState, useContext, useEffect } from 'react';
import { userContext } from '../../context';
import { useNavigate } from 'react-router-dom';


// Child Components
import UserTripDisplay from './UserTripDisplay';

function UserHomePage() {
  const [joinTripCode, setJoinTripCode] = useState('');
  const [tripsArray, setTripsArray] = useState([]);
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
     
  const handleCreateTrip = (e) => {
      e.preventDefault();
      return navigate('/NewTripPage');
  }

  // NOT built yet
  const handleJoinTrip = (e) => {
      e.preventDefault();
      // console.log(user);
      // patch
      // TODO make functionality in backend lol
      // setCurrentTrip(returned trip)
      // return navigate('/TripHomePage');
  }

  //This function makes the array of UserTripDisplay components with the correct info passed down,
  // but only after useContext provides a real value. The first time the page loads user from useContext
  // is undefined.
  function makeTrips(userTripArray) {
    if (!userTripArray) return [];
    return userTripArray.map(trip => {
      return <UserTripDisplay tripName={trip.tripName} date={trip.date} trip_id={trip.trip_id} />
    })
  }

  //Checks to see when user.trips has been updated, aka loaded by useContext, and then updates state to render the trip info
  useEffect(() => {
    setTripsArray(makeTrips(user.trips));
  }, [user.trips]);


    return (
        <div className="user-home-page">
            <div className='create-trip'>
                <button onClick={handleCreateTrip}>Create New Trip</button>
            </div>
            <div className='join-trip'>
                <input type="text" value={joinTripCode} onChange={(e) => setJoinTripCode(e.target.value)} />
                <button onClick={handleJoinTrip}>Join Trip</button>
            </div>
            <div className='current-trips'>
              <h2>Currently Planning</h2>
              {tripsArray}
            </div>
            <div className='past-trips'>
              <h2>Past Trips</h2>
            </div>
        </div>
    )
}


export default UserHomePage;