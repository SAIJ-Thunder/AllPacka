import React, {useState} from "react";

// This component will render withing the category componet

const itemDisplayComponent = ({ item }) => (
  <div>
            {/* check box if item is claimed */}
    <div>
        <button className='checkedItem'>√</button>
    </div>
    <div>
        <span>{item.number}</span>
    </div>
    <div>
    <span>{item.name}</span>
    </div>
    <div>
        <span>{item.user}</span>
    </div>
  </div>
)


export default itemsDisplayComponent;