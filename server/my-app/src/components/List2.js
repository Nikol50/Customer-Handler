import React from 'react';   

export default function DatePickerList2({itemList, addItem, deleteItem}) {
    const dateList = itemList.map((item) => {
        return <li>{item} <button type='button' value={item} onClick={deleteItem}>Delete</button> </li>
    }).sort();
    
    return (
        <div>
        <input type='date' onChange={(e) => document.getElementById('add_off_date').value = e.target.value}/>
        <button type='button' onClick={addItem} id='add_off_date'>Add</button>
        {dateList}
        </div>
      );
};
