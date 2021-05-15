import axios from "axios";

// this creates axios request to the url
const instance = axios.create({
    // THE API (cloud function) URL
    baseURL: 'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
    // "http://localhost:5001/challenge-4b2b2/us-central1/api",
});

export default instance;
