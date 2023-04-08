import React from 'react';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import NewTripPage from './pages/TripHome/NewTripPage.jsx';
import TripHomePage from './pages/TripHome/TripHomePage.jsx';
import UserHomePage from './pages/UserHome/UserHomePage.jsx';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

// import RootLayout from './layouts/RootLayout';
/*
ROUTE PROVIDER Component to 
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>} />
      <Route
        path='playTest'
        element={<PuzzlePageContainer key='PuzzlePageContainer' />}
        loader={puzzleTestLoader}
      />
      <Route
        path='play/:puzzleNumber'
        element={<PuzzlePageContainer key='PuzzlePageContainer' />}
        loader={puzzleLoader}
      />
    </Route>
  )
)
*/
  //have stuff that sticks around forever


  // after login, username state "setUserId" will be initialized 
  // and prop drilled down throughtout the pages
  // this is the _id of User document in User collection of the Mongo database
  const [userId, setUserId] = useState('');

  // pass in trip obj
  const [currentTrip, setCurrentTrip] = useState(null);


const App = () => {
  return (
    <h1>I'm here</h1>
    // ROUTE PROVIDER then create routes

  )
}

export default App;