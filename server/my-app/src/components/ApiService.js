import axios from "axios";

export  function getworker() {
  return axios.get('http://127.0.0.1:8000/workers/')
  .then(res => {
    return res.data
  }).catch(error => {
    // Handle error
    if (error.response) {
        // Request made and server responded
        console.log("Something went wrong: " + JSON.stringify(error.toJSON(), null, 2))
        alert(error.toJSON().code.toString() + " " + error.response.status + ": " + JSON.stringify(error.response.data));

      } else if (error.request) {
        // The request was made but no response was received
        console.log("ERROR OCCURED: " + error.request)
        alert("Something went wrong: " + error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        alert("Something went wrong...");
      }
  })
}

export  function addworker(worker) {
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
    }).then(res => {
        return res.data
    }).catch(error => {
        if (error.response) {
            // Request made and server responded
            console.log("Something went wrong: " + JSON.stringify(error.toJSON(), null, 2))
            alert(error.toJSON().code.toString() + " " + error.response.status + ": " + JSON.stringify(error.response.data));

          } else if (error.request) {
            // The request was made but no response was received
            console.log("ERROR OCCURED: " + error.request)
            alert("Something went wrong: " + error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            alert("Something went wrong...");
          }
    })
    .finally(() => {
        window.location.reload(false);
    });
}

export  function editworker(id, worker) {
    return axios.patch('http://127.0.0.1:8000/workers/' + id + '/',
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
        if (error.response) {
            // Request made and server responded
            console.log("Something went wrong: " + JSON.stringify(error.toJSON(), null, 2))
            alert(error.toJSON().code.toString() + " " + error.response.status + ": " + JSON.stringify(error.response.data));
          } else if (error.request) {
            // The request was made but no response was received
            console.log("ERROR OCCURED: " + error.request)
            alert("Something went wrong: " + error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            alert("Something went wrong...");
          }
    })
    .finally(() => {
        window.location.reload(false);
    });    
}

export  function deleteworker(id) {
    return axios.delete('http://127.0.0.1:8000/workers/'+id+'/')
    .then(res => {
        return res.data
    }).catch(error => {
        // Handle error
        if (error.response) {
            // Request made and server responded
            console.log("Something went wrong: " + JSON.stringify(error.toJSON(), null, 2))
            alert(error.toJSON().code.toString() + " " + error.response.status + ": " + JSON.stringify(error.response.data));

        } else if (error.request) {
            // The request was made but no response was received
            console.log("ERROR OCCURED: " + error.request)
            alert("Something went wrong: " + error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            alert("Something went wrong...");
        }
    }).finally(() => {
        window.location.reload(false);
    });
}