import axios from 'axios'

const apiURL: string = 'http://localhost:8080/v1/search?query='


function fetchApi(query: string){
    axios
        .get(apiURL + query)
        .then( res => console.log(res) )
        .catch( err => console.log(err) )
}

export {fetchApi};




