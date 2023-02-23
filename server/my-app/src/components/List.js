import React, { useEffect, useState } from 'react'

export default function DatePickerList({itemList, addItem, deleteItem}) {
    const [chosenDate, setchosenDate] = useState('');
    const dateList = itemList.map((item) => {
        return <li>{item} <button type='button' value={item} onClick={deleteItem}>Delete</button> </li>
    }).sort();

    return (
        <div>
        <input type='date' onChange={(e) => setchosenDate(e.target.value)}/>
        <button type='button' onClick={addItem} value={chosenDate}>Add</button>
        {dateList}
        </div>
      );
};
