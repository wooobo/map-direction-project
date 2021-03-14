import axios from "axios";
const BASEURL = "https://api.mapbox.com";
const client = axios.create();

client.defaults.baseURL = BASEURL;

export default client;

// import axios from "axios";
// const request = axios.create({
//     // baseURL: 'https://yoursite.com/api',
//     responseType: "json",
//     headers: {
//         "Content-Type": "application/json",
//     },
// });
// export default request;
