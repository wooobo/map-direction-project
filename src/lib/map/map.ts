import Mapboxgl, { LngLat } from "mapbox-gl";
import { getRoute } from "./api";

type MapOptions = {
  container: string | HTMLElement;
  accessToken: string;
  mapStyle?: string;
  lat: number;
  lng: number;
};

export default class CustomMap {
  mapInstance?: Mapboxgl.Map;
  lngLatBounds: Array<LngLat> = [];

  builder(mapOptions: MapOptions) {
    Mapboxgl.accessToken = mapOptions.accessToken;
    this.mapInstance = new Mapboxgl.Map({
      container: mapOptions.container,
      style: mapOptions.mapStyle,
      center: [mapOptions.lng, mapOptions.lat],
      zoom: 12,
      dragPan: true,
    });

    const _this = this;
    this.mapInstance.on("click", function (e) {
      _this.addMarker(e.target, e.lngLat);

      if (_this.lngLatBounds.length === 2) {
        getRoute(
          [_this.lngLatBounds[0].lng, _this.lngLatBounds[0].lat],
          [_this.lngLatBounds[1].lng, _this.lngLatBounds[1].lat],
          e.target
        );
      }
    });
  }

  addMarker(mapInstance: Mapboxgl.Map, lngLat: LngLat) {
    let layerId = "start";
    if (mapInstance.getLayer("start")) {
      layerId = "end";
      this.lngLatBounds.push(lngLat);
    } else {
      this.lngLatBounds.push(lngLat);
    }

    if (mapInstance.getLayer("end")) {
      return false;
    }

    mapInstance.addLayer({
      id: layerId,
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
                coordinates: [lngLat.lng, lngLat.lat],
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
  }

  test() {
    console.log("test...map...");
  }
}
