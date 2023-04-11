/*
I didn't have time to look at the code below, but at this point UserTripDisplay is the only 
component that sets a trip into the global context 'currentTrip'. NewTripPage should 
setCurrentTrip too. What displays on the page atm is actually hard coded. This page
should use the globally stored current trip to generate information on this page.

It might be prudent to store a copy of the global context to local state and edit
that when adding and deleting catgories/items on a trip. When the user is ready to 
save it should send the local state trip object off to the database to replace the 
old trip object (backend has code written to do this in tripController.updateTripDetails)
and then replace global context state with the returned doc from database. Or just replace
global context with local state, but the first way can give feedback that you successfully 
updated database.

Eventually this page should be able to grab categories from a trip's category array that only holds 
strings of the categories, make arrays (sortable based on specific criteria in the future) for each category, 
and then go through the trip's item array and add items that have a matching category to their 
respective category arrays. 

Each category array should prop drilled to a respective category component which will display
the information. This approach allows for the inclusion of category components that don't have 
items in them, which is important for when you add a new category. The category component 
should show up with no items, but will have the name of the category and an 'add item to
category' button.
*/

// *****************************    SB edits   *****************************
import React, {useState, useContext} from "react";
import MainItemsComponent from "./MainItemsComponent";
import CategoryComponent from "./CategoryComponent";
import { tripContext, userContext } from '../../context';
// import 
//QUESTIONS: are className "simpe-sections" labeled that way on purpose? I edited some

const TripHomePage = () => {
  const { currentTrip, setCurrentTrip } = useContext(tripContext);







  // copy to clipboard
  const copyTrip = async () => {
    await navigator.clipboard(URL);
    alert('Trip URL copied!');
  }


// buttons--------------------------------------------------------------------------------------------
  const handleAddItemCategory = (e) => {
    e.preventDefault();
    // add item schema
    return newItemSchema //component
  }

  const handleShowUserCards = (e) => {
    e.preventDefault();
    // return users and what they are bringing // unmounting 
        return 
  }
  const handleAllItemsChecked = (e) => {
    e.preventDefault();
    // list of checked items
  }
  const handleEditTrip = (e) => {
    e.preventDefault();
  }

  // return function-------------------------------------------------------------------------------------------
  // drag and drop info: https://react.dev/reference/react-dom/components/common#dragevent-handler

  return(
    // * one main div containing with 3 major branched divs
    // * div branch 1 = upper display of trip info + 4 buttons for 
    //     (add category, show user cards, all items checked, and edit trip) 
    // * div branch 2 = major box of items list/assignments with small divs inside
    //      will include multiple components, 
    // * div branch 3 = small button for "share trip with friends with this link"



    // main div
    <div className= 'trip-home-page'> 
      <header>
        <h1>Trip Home Page</h1>
        <h3>{'EDIT ME: trip name and date GO OVER WITH MARK & BILLY. THIS IS STATIC'}</h3> 
      </header>
      {/* div branch 1 ------------------------------------------------------------------------------*/}
      <div className='trip-page-info-options'>
        {/* buttons within div branch 1 (separated so we can implement different positions on the page) */}
        <div className='add-item-category'>
            <button onClick={handleAddItemCategory}>Add Item Category</button>
        </div>
        <div className='show-user-cards'>
            <button onClick={handleShowUserCards}>Show User Cards</button>
        </div>
        <div className='all-items-checked'>
            <button onClick={handleAllItemsChecked}>All Items Checked</button>
        </div>
        <div className='edit-trip'>
            <button onClick={handleEditTrip}>Edit Trip</button>
        </div>
      </div>
      {/* div branch 2 - ALL ITEMS CONTAINER component of components -------------------------------------------------*/}
      <div className='mainItemsDisplay'>
        <MainItemsComponent/>
      </div>




    {/* div branch 3 -  share button copy link in clipboard -------------------------------------------------*/}
      <div>
        <div className='share-trip-link'>
            <button onClick={copyTrip}>Share trip with this link</button>
        </div>
      </div> 
    </div>
  
  )
}

export default TripHomePage;