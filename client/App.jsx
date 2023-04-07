import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";

// import RootLayout from './layouts/RootLayout';
/*
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


const App = () => {
  return (
    <h1>I'm here</h1>
  )
}

export default App;