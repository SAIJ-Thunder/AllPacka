import React, {useState} from "react";
import '../../scss/TripHome.scss';


const AddItemsComponent = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [itemName, setItemName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const { category } = props;
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // post request to send information to backend
    fetch('/api/trip/additems', {
      method: 'POST',
      headers: {'Content-Type': 'application-json'},
      body: JSON.stringify({quantity, itemName, assignedTo, category})
    })
    .then(res => res.json())
    .catch(err => console.log(`error in handle submit ${err}`))
  }

  

  return (
  <div className='item'>
    <form onSubmit={handleSubmit}>
      <div className='item-input'>
          <input id="quantity-dropdown" type="number" onChange={(e)=>setQuantity(e.target.value)} placeholder="Quanity"/>

          <input type="text" onChange={(e)=>setItemName(e.target.value) } placeholder="Item Name" />

          <input type="text" onChange={(e)=>setAssignedTo(e.target.value) } placeholder="Assigned to" />
        <button className="submit-button" type="submit">Submit</button>
      </div>
    </form>
  </div>
  )

}


export default AddItemsComponent;
 //OLD CODE BELOW

// import React, {useState} from "react";
// // import 

// // This component will render withing the category componet

// const ItemsDisplayComponent = ({ item }) => {
//     console.log(item.name)
//     return (
//         <div className='ItemRow'>
//         {/* check box if item is claimed */}
//         <div>
//             <button className='checkedItem'>√</button>
//         </div>
//         <div className='itemNumber'>
//             // <span>{item.number}</span>
//         </div>
//         <div className='itemName'>
//           <span>{item.name}</span>
//         </div>
//         <div className='itemUser'>
//             <span>{item.user}</span>
//         </div>
//       </div>
//     )
//   }



// export default ItemsDisplayComponent;