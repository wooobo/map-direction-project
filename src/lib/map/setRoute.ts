import Mapboxgl, { LngLat } from "mapbox-gl";
import { RouteLatLng, searchRoute } from "../api/mapbox/searchRoute";

export type SearchRouteFeature = {
  map: Mapboxgl.Map;
  lngLatBounds: Array<LngLat>;
};

export async function setRoute({ map, lngLatBounds }: SearchRouteFeature) {
  const startWayPoint: RouteLatLng = {
    lat: lngLatBounds[0].lat,
    lng: lngLatBounds[0].lng,
  };

  const endWayPoint: RouteLatLng = {
    lat: lngLatBounds[lngLatBounds.length - 1].lat,
    lng: lngLatBounds[lngLatBounds.length - 1].lng,
  };

  return await searchRoute({
    wayPoints: lngLatBounds,
    startPoint: startWayPoint,
    endPoint: endWayPoint,
  });
}
