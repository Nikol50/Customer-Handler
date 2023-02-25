import React, { useEffect, useState } from 'react'
import AddDateToList from './AddDateToList'


export default function AddWorker({handleAddSubmit, handleCancelBtn}) {
  const [sickDates, setSickDates] = useState([])
  const [offDates, setOffDates] = useState([])

  const addSickDate = (e) => {
    console.log(e.target.value)
    // The "new Set" part is done for uniqueness of the items
    if (e.target.value) {
      setSickDates([...new Set([...sickDates, e.target.value])].sort())
    }
  };

  const deleteSickDate = (e) => {
    setSickDates(sickDates.filter(item => item !== e.target.value))
  };

  const modifiedHandleAddSubmit = (e) => {
    e.target.sick_dates = sickDates
    e.target.off_dates = offDates
    handleAddSubmit(e)

  };

  const addOffDate = (e) => {
    // The "new Set" part is done for uniqueness of the items
    console.log(e.target.value)
    if (e.target.value) {
      setOffDates([...new Set([...offDates, e.target.value])].sort())
    }
  };

  const deleteOffDate = (e) => {
    setOffDates(offDates.filter(item => item !== e.target.value))
  };


  return (
    <>
    <h3>ADD FORM:</h3>
    <form onSubmit={modifiedHandleAddSubmit}>
        Id <input type='text' name='id' /><br/>
        First Name <input type='text' name='first_name' /><br/>
        Last Name <input type='text' name='last_name' /><br/>
        Address  <input type='text' name='address' /><br/>
        Phone <input type='text' name='phone_num' /><br/>
        Start Date <input type='date' name='start_date'/><br/>
        Sick Dates <AddDateToList itemList={sickDates} addItem={addSickDate} deleteItem={deleteSickDate}/><br/>
        Off Dates <AddDateToList itemList={offDates} addItem={addOffDate} deleteItem={deleteOffDate}/><br/>
        <button type='submit'>ADD</button>
        <button type='button' onClick={handleCancelBtn}>Cancel</button>

    </form>
    </>
  )
}