import request from "../request";
const BASEURL = "https://api.mapbox.com";

// TODO env파일로 옴겨야지
const accessToken =
  "pk.eyJ1IjoiaXJvb29yaSIsImEiOiJja2w3Yjk4dGQycG5rMnVtczB1ZmUxNnoxIn0.4UhohTVUBeUVuUiV0Fi2Iw";

export interface MapJsonResponse {
  features: any[];
}
export interface Search {
  search_text: String;
}

const api = {
  fetchAddressSearch: async (search: Search) => {
    return await request.get<MapJsonResponse>(
      BASEURL +
        `/geocoding/v5/mapbox.places/${search.search_text}.json?access_token=${accessToken}`
    );
  },
};

export default api;
