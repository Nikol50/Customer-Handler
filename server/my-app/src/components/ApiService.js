import axios from "axios";

export  function getworker() {
  return axios.get('http://127.0.0.1:8000/workers/')
  .then(res => {
    return res.data
  }).catch(error => {
    // Handle error
    alert("something went wrong...." + error.response.status);
})}

export  function addworker(worker) {
console.log("start_date", worker.start_date.value || null)
console.log("sick_dates", worker.sick_dates)
console.log("off_dates", worker.off_dates)
    return axios.post('http://127.0.0.1:8000/workers/',
    {
        id: worker.id.value,
        first_name: worker.first_name.value,
        last_name: worker.last_name.value,
        address: worker.address.value,
        phone_num: worker.phone_num.value,
        start_date: worker.start_date.value || null,  // If start date not set, then set null
        sick_dates: worker.sick_dates,
        off_dates: worker.off_dates,
    })
    .then(res => {
        return res.data
    }).catch(error => {
        // Handle error
        if (error.response.status==400);
            alert("something went wrong...." + error.response.status);
    })}

export  function editworker(id, worker) {
    return axios.patch('http://127.0.0.1:8000/workers/'+id+'/',
    {
        first_name: worker.first_name.value,
        last_name: worker.last_name.value,
        address : worker.address.value,
        phone_num: worker.phone_num.value,
        start_date: worker.start_date.value || null,  // If start date not set, then set null
        sick_dates: worker.sick_dates,
        off_dates: worker.off_dates,
    })
    .then(res => {
        return res.data
    }).catch(error => {
        // Handle error
        alert("something went wrong...." + error.response.status);
    })}

export  function deleteworker(id) {
    return axios.delete('http://127.0.0.1:8000/workers/'+id+'/')
    .then(res => {
        return res.data
    }).catch(error => {
        // Handle error
        alert("something went wrong...." + error.response.status);
    })}