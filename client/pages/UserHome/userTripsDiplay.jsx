import React, { useState } from 'react';

const userTripsDisplay = ({ user }) => {

    const tripsArray = user.trips

    const trips = tripsArray.map(trip => {
        <div className='userTrip'>
                <span>`${trip.name} ${trip.date}`</span>
        </div>
    })

return(
    <tripsArray/ >
    )
}

export default userTripsDisplay