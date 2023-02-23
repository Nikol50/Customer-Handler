import React from 'react';   

export default function DatePickerList({itemList, addItem, deleteItem}) {
    const dateList = itemList.map((item) => {
        return <li>{item} <button type='button' value={item} onClick={deleteItem}>Delete</button> </li>
    }).sort();
    
    return (
        <div>
        <input type='date' onChange={(e) => document.getElementById('add_sick_date').value = e.target.value}/>
        <button type='button' onClick={addItem} id='add_sick_date'>Add</button>
        {dateList}
        </div>
      );
};
