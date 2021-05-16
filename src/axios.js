import axios from "axios";

// this creates axios request to the url
const instance = axios.create({
    // THE API (cloud function) URL
    baseURL: 'https://us-central1-rookas-amzon-app.cloudfunctions.net/api' // this is the api url, cloud function
    // "http://localhost:5001/challenge-4b2b2/us-central1/api",
    // http://localhost:5001/rookas-amzon-app/us-central1/api the local one
});

export default instance;
