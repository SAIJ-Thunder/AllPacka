// *****************************    SB edits   *****************************
import React, {useState} from "react";
import { redirect, Form } from "react-router-dom";

//QUESTIONS: are className "simpe-sections" labeled that way on purpose? I edited some

export const TripHomePage = () => {

  const tripData = useBroswerLoader();


  const tripLoader = () => {
    //fetch trip data from trip collection
    //retrun data.json
  }



  // copy to clipboard
  const copyTrip = async () => {
    await navigator.clipboard(URL);
    alert('Trip URL copied!');
  }


// buttons--------------------------------------------------------------------------------------------
  const handleAddItemCategory = (e) => {
    e.preventDefault();
    // add item schema
    return newIteamSchema //component
  },

  const handleShowUserCards = (e) => {
    e.preventDefault();
    // return users and what they are bringing
        return redirect(URL);
  },
  const handleAllItemsChecked = (e) => {
    e.preventDefault();
    // list of checked items
  },
  const handleEditTrip = (e) => {
    e.preventDefault();
    // post request to server
    fetch(`/trips/:${userId}`, {
        method: "POST",
        body: JSON.stringify({location: location, tripType: tripType, date: date, tripName: tripName})
    })
    .then(res => res.json())
    .then((res) => {
        // this responses should have the _id of the new trips' database
        // id --> _id
        setLocation(location);
        setDate(tripType);
        setTripType(date);
        setTripName(tripName);
        // grab the _id from the res -> also has
        const URL = './TripHome/NewTripPage' + res.trip_id
        
    //invoke prop drilled setCurrentTrip, pass in trip object

        // redirect to the trips home page
        return redirect(URL);
    })
    .catch((err) => {
        console.log(err);
        alert('Failed to edit trip')
    }); 
  },

  // COMPONENT FUNCTION FOR INDIVIDUAL Categories, allowing to add smaller item display component
  const createItemCategoryContainer = () => {
    //might need to make new files for components? idk how to add them to each other

    //outer category div
    <div>

      {/* the only static thing is the category name/add item box */}
      <div className='category'>

        <button onClick={handleAddItem}>+</button>
      </div>

      <div
          draggable={true}
          onDragStart={e => console.log('onDragStart')}
          onDragEnd={e => console.log('onDragEnd')}
        >
          Drag source
        </div>

        <div
          onDragEnter={e => console.log('onDragEnter')}
          onDragLeave={e => console.log('onDragLeave')}
          onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
          onDrop={e => console.log('onDrop')}
        >
          Drop target
        </div>

      {/* check box if item is claimed */}
      <label>
      <input type="checkbox" name="myCheckbox" />
      </label>
      {/* item count box  */}
      <label>
        <input type="text" value={numOfItems} name="numOfItems" onChange={setNumOfItems(e.target.value)}/>
      </label>
      <label>
        <input type="text" value={itemName} name="itemName" onChange={setItemName(e.target.value)}/>
      </label>
      <label>
        <input type="text" value={itemClaimedByName} name="itemClaimedByName" onChange={setItemClaimedByName(e.target.value)}/>
      </label>

    </div>


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
        <h3>{'EDIT ME: trip name and date'}</h3> 
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
            <button onClick={handleEditTrip}>Create New Trip</button>
        </div>
      </div>



      {/* div branch 2 - component of components -------------------------------------------------*/}
      <div>
      {/* //outer category div REPEATED FROM FUNCTION ABOVE -- USE DRY?????? */}
        <div>

          {/* the only static thing is the category name/add item box */}
          <div className='category'>

            <button onClick={handleAddItem}>+</button>
          </div>

          <div
              draggable={true}
              onDragStart={e => console.log('onDragStart')}
              onDragEnd={e => console.log('onDragEnd')}
            >
              Drag source
            </div>

            <div
              onDragEnter={e => console.log('onDragEnter')}
              onDragLeave={e => console.log('onDragLeave')}
              onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
              onDrop={e => console.log('onDrop')}
            >
              Drop target
            </div>

          {/* check box if item is claimed */}
          <label>
          <input type="checkbox" name="myCheckbox" />
          </label>
          {/* item count box  */}
          <label>
            <input type="text" value={numOfItems} name="numOfItems" onChange={setNumOfItems(e.target.value)}/>
          </label>
          <label>
            <input type="text" value={itemName} name="itemName" onChange={setItemName(e.target.value)}/>
          </label>
          <label>
            <input type="text" value={itemClaimedByName} name="itemClaimedByName" onChange={setItemClaimedByName(e.target.value)}/>
          </label>

        </div>




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

