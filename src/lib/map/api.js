import { mapboxSearchApi } from "../common/request/mapbox";
const accessToken =
  "pk.eyJ1IjoiaXJvb29yaSIsImEiOiJja2w3Yjk4dGQycG5rMnVtczB1ZmUxNnoxIn0.4UhohTVUBeUVuUiV0Fi2Iw";
// create a function to make a directions request
export function getRoute(start, end, map) {
  console.log(start, end);
  // make a directions request using cycling profile
  // an arbitrary start will always be the same
  // only the end or destination will change
  // var start = [-122.662323, 45.523751];
  var url =
    "https://api.mapbox.com/directions/v5/mapbox/cycling/" +
    start[0] +
    "," +
    start[1] +
    // ";" +
    // 127.125151 +
    // "," +
    // 37.557354 +
    ";" +
    end[0] +
    "," +
    end[1] +
    "?overview=full&steps=true&geometries=geojson&access_token=" +
    accessToken;

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onload = function () {
    var json = JSON.parse(req.response);
    var data = json.routes[0];
    var route = data.geometry.coordinates;
    var geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    // if the route already exists on the map, reset it using setData
    console.log(map);
    if (map.getSource("route")) {
      map.getSource("route").setData(geojson);
    } else {
      // otherwise, make a new request
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: route,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
    // add turn instructions here at the end
  };
  req.send();
}
const fetchAddressSearch = async ({ search_text }) => {
  return new Promise((res, rej) => {
    const fetchData = mapboxSearchApi.fetchAddressSearch(search_text);
    console.log(fetchData);
    res(fetchData);
  });
  // return
};

export { fetchAddressSearch };
