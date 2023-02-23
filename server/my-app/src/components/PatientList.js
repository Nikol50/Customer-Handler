import React, { useEffect, useState } from 'react'
import { getworker, addworker, editworker , deleteworker} from './ApiService'
import AddWorker from './AddWorker'
import EditWorker from './EditWorker'

export default function WorkerList() {

const [workers, setworkers] = useState([])
const [showAddWorkerForm, setShowAddWorkerForm] = useState(false)
const [showEditWorkerForm, setShowEditWorkerForm] = useState(false)
const [selectedEditData, setSelectedEditData] = useState()

useEffect(() => {
    let mount = true
    getworker()
    .then(res => {console.log("res from api", res)
        setworkers(res)
        return() => mount = false
    })
}, [])

const handleAddSubmit = (e) => {
    //let mount = true
    console.log("Add submit: ", e.target)
    console.log("Add submit1: ", e.target.sick_dates)
    console.log("Add submit1: ", e.target.off_dates)
    addworker(e.target)
    .then(res => {
        console.log("Successfully added: ", res)
    })
}
const handleEditBtn = (worker) => {
    setSelectedEditData(worker)
    console.log("worker selected is", worker)
    setShowEditWorkerForm(true)
    setShowAddWorkerForm(false)
}
const handleAddBtn = () => {
    setShowEditWorkerForm(false)
    setShowAddWorkerForm(true)
}
const handleEditSubmit = (id, e) => {
    console.log("Editing: ", e.target)
    editworker(id, e.target)
    .then(res => {
        console.log("Successfully Edited: ", res)
    })
}

function handleCancelBtn() {
    setShowAddWorkerForm(false)
}

const handleDeleteBtn = (id) => {
    deleteworker(id)
    .then(res => {
        setworkers(workers.filter(w=> w.id !== id))
    })
}
return (
    <>
    <h3>WORKERS LIST</h3>
    <table border={"2px"} cellPadding={"10px"}>
        <thead>
            <tr>
                <td>ID</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Address</td>
                <td>Phone Number</td>
                <td>Start Date</td>
                <td>Sick Dates</td>
                <td>Off Dates</td>
            </tr>
        </thead>
        <tbody>
            {console.log("THE LIST", workers)}
            {workers.map(worker => {
                return <tr key={worker.worker_id}>
                <td>{worker.id}</td>
                <td>{worker.first_name}</td>
                <td>{worker.last_name}</td>
                <td>{worker.address}</td>
                <td>{worker.phone_num}</td>
                <td>{worker.start_date}</td>
                <td>{worker.sick_dates.join(" ; ")}</td>
                <td>{worker.off_dates.join(" ; ")}</td>
                <td><button onClick={()=>handleEditBtn(worker)}>Edit</button> <button onClick={()=>handleDeleteBtn(worker.id)}>Delete</button></td>
            </tr>
            })}    
        </tbody>
    </table>
    <button onClick={handleAddBtn}>Add New Worker</button>
    {showAddWorkerForm && <AddWorker handleAddSubmit={handleAddSubmit} handleCancelBtn = {handleCancelBtn}/>}
    {showEditWorkerForm && <EditWorker handleEditSubmit={handleEditSubmit} selectedEditData = {selectedEditData} handleCancelBtn = {handleCancelBtn}/>}
    </>
  )
}