import axios from "axios";
const BASEURL = "https://api.mapbox.com";
const client = axios.create();

// TODO env파일로 옴겨야지
export const accessToken = process.env.REACT_APP_MAPBOX_KEY;
client.defaults.baseURL = BASEURL;

export default client;
