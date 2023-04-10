import React, {useState} from "react";
import itemsDisplayComponent from "./itemsDisplayComponent";
// import './categoryComponent.scss'

// items display is the child Component
// should display each category and its items component inside
// we need to get catagory state in here, cATAGORY

const categoryComponent = () => {

  const [item, setItem] = useState('')

  const handleAddItem = () => {
    // possibly adding some inputfield comp
    // rendering jsx 
  }

   return (
    <div className='category'>
      <div>
        {/* add items to category by pressing " + " button */}
        <button onClick={handleAddItem}>+</button>
    </div>
      <div>
        
        <itemsDisplayComponent/>
      </div>
    </div>
   )
}


export default categoryComponent




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