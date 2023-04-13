import React, {useState} from "react";
import AddItemsComponent from "./AddItemsComponent";
import '../../scss/TripHome.scss';

const CategoryComponent = () => {

  // let i = 1;
  // const handleAddItem = () => {
  //   // possibly adding some inputfield comp
  //   // rendering jsx 
  // }
  // // let item = items[0]   
  // // each catagory will render ismt's associated items will be rendered 
  // const itemsArray = items.map((it) => {
  //  return <ItemsDisplayComponent item={it} key={i++}/>
  // })

  //  return (
  //   <div className='category'>
  //     <span className='categoryLabel'> {category} </span>
  //     <div>
  //       {/* add items to category by pressing " + " button */}
  //       <button onClick={handleAddItem}>+</button>
  //   </div>
  //     <div>
  //       {itemsArray}
  //     </div>
  //   </div>
  //  )

  //---------------------------------------------------- NEW----------------------------------------------------


  const [category, setCategory] = useState('');
  const [items, setItems] = useState([])
  const addItems=() => {
    const newItems = [...items, <AddItemsComponent category={category} key={items.length} />];
    setItems(newItems);
  }


  return(
    <div className="add-new-category">
      <div>
      <label htmlFor="category">Category:</label>
      <select name="category" onChange={(e)=>setCategory(e.target.value)}>
        <option value="food">Food</option>
        <option value="drinks">Drinks</option>
        <option value="snacks">Snacks</option>
      </select>
      </div>
        <button className="category-button" id="add-item-button" onClick={addItems}>Add Item</button>
        <div> 
          {items}
        </div>
    </div>
  )
}


export default CategoryComponent




    //   {/* FOR REFERENCE - TO MOVE EACH CATEGORY COMPONENT*/
    //     /* <div
    //   draggable={true}
    //   onDragStart={e => console.log('onDragStart')}
    //   onDragEnd={e => console.log('onDragEnd')}
    //   >
    //   Drag source
    //   </div>

    //   <div
    //   onDragEnter={e => console.log('onDragEnter')}
    //   onDragLeave={e => console.log('onDragLeave')}
    //   onDragOver={e => { e.preventDefault(); console.log('onDragOver'); }}
    //   onDrop={e => console.log('onDrop')}
    //   >
    //   Drop target
    //   </div> */}