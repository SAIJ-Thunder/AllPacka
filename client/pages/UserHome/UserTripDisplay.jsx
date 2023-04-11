import React, { useState, useContext, useEffect } from 'react';
import { tripContext, userContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const UserTripDisplay = ({ tripName, date, trip_id }) => {

  const navigate = useNavigate();
  const { currentTrip, setCurrentTrip } = useContext(tripContext);


  // When a button is clicked, this function retrieves the details of the trip and sets
  // that trip to global context for use in the TripHomePage 
  const selectTrip = async (trip_id) => {
    const response = await fetch(`/api/trip/${trip_id}`);
    if (response.status === 200) {
      const foundTrip = await response.json();
      setCurrentTrip(foundTrip);
      return navigate('/TripHomePage');
    } else {
      alert('Server fail getting trip in selectTrip() in UserHomePage')
    }
  }

return(
  <div key={trip_id}>
    {tripName}, {date}
    <button onClick={() => selectTrip(trip_id)}>Let's Go!</button>
  </div>
    )
}

export default UserTripDisplay