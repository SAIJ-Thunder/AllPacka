import React, {useState} from "react";

// child component of mainItemsComponent && parent componet of itemsDisplayComponet
import categoryComponent from "./categoryComponent";



const mainItemsComponent = ({ currentTrip }) => {

    const itemsArr = currentTrip.items

    return (
        <div className='mainItemDisplay'>
            <div className='item legend'>
                <span>Item Number</span>
                <span>Item Name</span>
                <span>Assigned To...</span>
            </div>
            <div className='displayedItems'>
                <categoryComponent/>
            </div>
        </div>
    )
}



export default mainItemsComponent;