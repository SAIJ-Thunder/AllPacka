



<div>
        {/* check box if item is claimed */}
<label>
<input type="checkbox" name="myCheckbox" />
</label>
        {/* item count box  */}
<label>
  <input type="text" value={numOfItems} name="numOfItems" onChange={setNumOfItems(e.target.value)}/>
</label>
          {/* item name */}
<label>
  <input type="text" value={itemName} name="itemName" onChange={setItemName(e.target.value)}/>
</label>
          {/* Claimed by */}
<label>
  <input type="text" value={itemClaimedByName} name="itemClaimedByName" onChange={setItemClaimedByName(e.target.value)}/>
</label>

</div>