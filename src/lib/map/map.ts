import Mapboxgl, { LngLatBounds } from "mapbox-gl";
import { getRoute } from "./api";
type MapOptions = {
  container: string | HTMLElement;
  accessToken: string;
  mapStyle: string;
  lat: number;
  lng: number;
};

export default class CustomMap {
  private _mapOptions: MapOptions;

  map: object;

  constructor(mapOptions: MapOptions) {
    Mapboxgl.accessToken = mapOptions.accessToken;
    this._mapOptions = mapOptions;
    this.map = this.builder();
  }
  builder() {
    var start = [this._mapOptions.lng, this._mapOptions.lat];
    var end = [127.254132, 37.540772];
    const mapInstance = new Mapboxgl.Map({
      container: this._mapOptions.container,
      style: this._mapOptions.mapStyle,
      center: [this._mapOptions.lng, this._mapOptions.lat],
      zoom: 16,
      dragPan: true,
    });

    let bounds = new LngLatBounds([
      new Mapboxgl.LngLat(start[0], start[1]),
      new Mapboxgl.LngLat(end[0], end[1]),
    ]);
    console.log(bounds);
    // // initialize the map canvas to interact with later
    // // var canvas = mapInstance.getCanvasContainer();
    //
    mapInstance.on("load", function () {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start, end, mapInstance);

      // Add starting point to the map
      mapInstance.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
      // this is where the code from the next step will go
    });

    return mapInstance;
  }
}
