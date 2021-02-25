// create a function to make a directions request
export function getRoute(start, end, map) {
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
    "?steps=true&geometries=geojson&access_token=" +
    "pk.eyJ1IjoiaXJvb29yaSIsImEiOiJja2w3Yjk4dGQycG5rMnVtczB1ZmUxNnoxIn0.4UhohTVUBeUVuUiV0Fi2Iw";

  // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onload = function () {
    var json = JSON.parse(req.response);
    var data = json.routes[0];
    console.log(data);
    var route = data.geometry.coordinates;
    console.log(route);
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
      console.log("d");
      map.getSource("route").setData(geojson);
    } else {
      console.log("d1");
      console.log(geojson);
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
