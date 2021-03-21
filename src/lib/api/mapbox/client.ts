import axios from "axios";
const BASEURL = "https://api.mapbox.com";
const client = axios.create();

// TODO env파일로 옴겨야지
export const accessToken =
  "pk.eyJ1IjoiaXJvb29yaSIsImEiOiJja2w3Yjk4dGQycG5rMnVtczB1ZmUxNnoxIn0.4UhohTVUBeUVuUiV0Fi2Iw";
client.defaults.baseURL = BASEURL;

export default client;
