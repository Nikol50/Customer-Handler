import React, { useEffect, useState } from 'react'
import DatePickerList from './List'

export default function EditWorker({handleEditSubmit, selectedEditData, handleCancelBtn}) {
  const [sickDates, setSickDates] = useState(selectedEditData.sick_dates)
  const [offDates, setOffDates] = useState(selectedEditData.off_dates)

  const addSickDate = (e) => {
    // The "new Set" part is done for uniqueness of the items
    if (e.target.value) {
      setSickDates([...new Set([...sickDates, e.target.value])].sort())
    }
  };

  const deleteSickDate = (e) => {
    setSickDates(sickDates.filter(item => item !== e.target.value))
  };

  const modifiedhandleEditSubmit = (id, e) => {
      e.target.sick_dates = sickDates
      e.target.off_dates = offDates
      handleEditSubmit(id, e)
  };

  const addOffDate = (e) => {
    // The "new Set" part is done for uniqueness of the items
    if (e.target.value) {
      setOffDates([...new Set([...offDates, e.target.value])].sort())
    }
  };

  const deleteOffDate = (e) => {
    setOffDates(offDates.filter(item => item !== e.target.value))
  };
  return (
    <>
    <h3>EDIT FORM:</h3>
    <form onSubmit={(e)=>modifiedhandleEditSubmit(selectedEditData.id, e)}>
        First Name <input type='text' name='first_name' defaultValue={selectedEditData.first_name}/><br/>
        Last Name <input type='text' name='last_name' defaultValue={selectedEditData.last_name}/><br/>
        Address <input type='text' name='address' defaultValue={selectedEditData.address} /><br/>
        Phone <input type='text' name='phone_num' defaultValue={selectedEditData.phone_num} /><br/>
        Start Date <input type='date' name='start_date' defaultValue={selectedEditData.start_date} /><br/>
        Sick Dates <DatePickerList itemList={sickDates} addItem={addSickDate} deleteItem={deleteSickDate}/><br/>
        Off Dates <DatePickerList itemList={offDates} addItem={addOffDate} deleteItem={deleteOffDate}/><br/>
        <button type='submit'>EDIT</button>
        <button onClick={handleCancelBtn}>Cancel</button>
    </form>
    </>
  )
}