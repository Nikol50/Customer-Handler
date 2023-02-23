import axios from "axios";

export  function getworker() {
  return axios.get('http://127.0.0.1:8000/workers/')
  .then(res => {
    return res.data
  })}

export  function addpatient(worker) {
return axios.post('http://127.0.0.1:8000/workers/',
{
    id: worker.id.value,
    first_name: worker.first_name.value,
    last_name: worker.last_name.value,
    address : worker.address.value,
    phone_num: worker.phone_num.value,
})
.then(res => {
    return res.data
})}

export  function editpatient(id, worker) {
    return axios.put('http://127.0.0.1:8000/workers/'+id+'/',
    {
        id: worker.id.value,
        first_name: worker.first_name.value,
        last_name: worker.last_name.value,
        address : worker.address.value,
        phone_num: worker.phone_num.value,
    })
    .then(res => {
        return res.data
    })}

export  function deletepatient(id) {
    return axios.delete('http://127.0.0.1:8000/workers/'+id+'/')
    .then(res => {
        return res.data
    })}