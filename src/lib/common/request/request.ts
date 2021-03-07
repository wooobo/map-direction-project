import axios from "axios";
const request = axios.create({
  // baseURL: 'https://yoursite.com/api',
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});
export default request;
