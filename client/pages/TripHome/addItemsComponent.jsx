import React, {useState} from "react";
import '../../scss/TripHome.scss';


const AddItemsComponent = () => {
  const [quantity, setQuantity] = useState(0);
  const [itemName, setItemName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('hi')
  // }

  return (
    <form /*onSubmit={handleSubmit}*/>
      <input type="number" onChange={(e)=>setQuantity(e.target.value)} placeholder="Quanity"/>
      <input type="text" onChange={(e)=>setItemName(e.target.value) } placeholder="Item Name" />
      <input type="text" onChange={(e)=>setAssignedTo(e.target.value) } placeholder="Assigned to" />
      {/* <button type="submit">SUBMIT</button> */}
  </form>
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