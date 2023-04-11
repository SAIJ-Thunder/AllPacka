import React, { useState, useContext } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NewTripPage from './pages/TripHome/NewTripPage.jsx';
import TripHomePage from './pages/TripHome/TripHomePage.jsx';
import UserHomePage from './pages/UserHome/UserHomePage.jsx';
import RootLayout from './layouts/rootLayout';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import { tripContext, userContext } from './context.js';

// This is react 6.4 notation which allows for some extra tools like loaders to be used.
// So far it's made more sense to do fetch requests in the functional components. So
// loaders haven't been needed. This is because sign-up and login have unique fetch requests
// to grab user objects. Trips also have unique fetch paths. Loaders only make sense when a 
// single page needs to perform the same async functionality before loading a page.

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<LoginPage key='LoginPage'/>} />
      <Route
        path='/SignupPage'
        element={<SignupPage key='SignupPage' />}
      />
      <Route
        path='/UserHomePage'
        element={<UserHomePage key='UserHomePage' />}
      />
      <Route
        path='/NewTripPage'
        element={<NewTripPage key='NewTripPage' />}
      />
      <Route
        path='/TripHomePage'
        element={<TripHomePage key='TripHomePage' />}
      />
    </Route>
  )
)


const App = () => {

  const [ user, setUser ] = useState('null');
  const [ currentTrip, setCurrentTrip ] = useState('null');
  const userValue = { user, setUser };
  const currentTripValue = { currentTrip, setCurrentTrip };
  
  // Using these context providers with context.js provides a way to store data accessible to
  // all children components. This way we can query the database as little as possible.
  return (
    <userContext.Provider value={userValue}>
      <tripContext.Provider value={currentTripValue}>
        <RouterProvider router={router} />
      </tripContext.Provider>
    </userContext.Provider>
  )
}

export default App;