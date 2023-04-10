import React from 'react';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NewTripPage from './pages/TripHome/NewTripPage.jsx';
import TripHomePage from './pages/TripHome/TripHomePage.jsx';
import UserHomePage from './pages/UserHome/UserHomePage.jsx';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

import RootLayout from './layouts/rootLayout';

// ROUTE PROVIDER Component to 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<LoginPage key='LoginPage'/>} />
      <Route
        path='/LoginPage'
        element={<LoginPage key='LoginPage' />}
        // loader={puzzleTestLoader}
      />
      <Route
        path='/SignupPage'
        element={<SignupPage key='SignupPage' />}
        // loader={puzzleTestLoader}
      />
      <Route
        path='/UserHomePage'
        element={<UserHomePage key='UserHomePage' />}
        // loader={puzzleLoader}
      />
      <Route
        path='/NewTripPage'
        element={<NewTripPage key='NewTripPage' />}
        // loader={puzzleLoader}
      />
      <Route
        path='/TripHomePage'
        element={<TripHomePage key='TripHomePage' />}
        // loader={puzzleLoader}
      />
    </Route>
  )
)

  //have stuff that sticks around forever


  // after login, username state "setUserId" will be initialized 
  // and prop drilled down throughtout the pages
  // this is the _id of User document in User collection of the Mongo database
  const [userId, setUserId] = useState('');

  // pass in trip obj
  const [currentTrip, setCurrentTrip] = useState(null);


const App = () => {
  return (
    // <h1>I'm here</h1>
    // // ROUTE PROVIDER then create routes
    <RouterProvider router={router}/>

  )
}

export default App;