import React, {useState, useContext} from "react";
import MainItemsComponent from "./MainItemsComponent";
import CategoryComponent from "./CategoryComponent";
import { tripContext, userContext } from '../../context';
import '../../scss/TripHome.scss';
import AddItemsComponent from "./AddItemsComponent";


const TripHomePage = () => {
  // setCategory is always a function to update category variable
  //category is an array declared below
const [category, setCategory] = useState([])

const addCategory =() => {
  // setShowCategory(<CategoryComponent/>)
  const newCategory = [...category, <CategoryComponent key={category.length} />];
  setCategory(newCategory);
}
  
  
  return(

    <div className= 'trip-home-page'> 
      

      {/* put in parent div */}
      <header className='add-item-category'>
        <h1>Trip Home Page</h1>
        <div >
          <button className="category-button" onClick={addCategory}>Add Category</button>
        </div>
      </header>
      
      <div className='trip-page-info-options'>
          {category}
      </div>
      
      <div className='mainItemsDisplay'>


      </div>
    </div>

  
  )
}

export default TripHomePage;