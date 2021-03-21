import Mapboxgl, { LngLat } from "mapbox-gl";
import { setRoute } from "./setRoute";
import { RouteResponse } from "../api/mapbox/searchRoute";

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
      if (_this.lngLatBounds.length > 1) {
        setRoute({
          map: e.target,
          lngLatBounds: _this.lngLatBounds,
        }).then(({ routes }: RouteResponse) => {
          if (routes) {
            // 기존 레이어 삭제
            _this.removeLayer(
              e.target,
              `route${_this.lngLatBounds.length - 1}`
            );

            console.log("add: ", `route${_this.lngLatBounds.length}`);
            e.target.addLayer({
              id: `route${_this.lngLatBounds.length}`,
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: routes[0].geometry.coordinates,
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
        });
      }
    });
  }

  addMarker(mapInstance: Mapboxgl.Map, lngLat: LngLat) {
    this.lngLatBounds.push(lngLat);

    mapInstance.addLayer({
      id: `point${this.lngLatBounds.length}`,
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
        "circle-radius": 5,
        "circle-color": "#ff2e63",
      },
    });
  }

  removeLayer(mapInstance: Mapboxgl.Map, id: string) {
    if (mapInstance.getLayer(id)) {
      mapInstance.removeLayer(id);
    }
  }

  test() {
    console.log("test...map...");
  }
}
