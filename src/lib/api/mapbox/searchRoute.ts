import client from "./client";
import { accessToken } from "./client";
import qs from "qs";

export async function searchRoute(params: SearchRouteParams) {
  const paths = params.wayPoints.map((x) => `${x.lng},${x.lat}`).join(";");

  client.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
  const response = await client.post<RouteResponse>(
    `/directions/v5/mapbox/cycling?access_token=${accessToken}`,
    qs.stringify({
      overview: "full",
      steps: true,
      geometries: "geojson",
      exclude: "ferry",
      coordinates: paths,
    })
  );

  return response.data;
}

export type routes = {
  geometry: geometry;
  distance: number;
  duration: number;
  legs: any[];
  weight: number;
  weight_name: string;
};

export type geometry = {
  coordinates: [];
  type: string;
};

export interface RouteResponse {
  routes: routes[];
  uuid: any[];
  waypoints: any[];

  matchings: routes[];
}

export type RouteLatLng = {
  lat: number;
  lng: number;
};

export type SearchRouteParams = {
  wayPoints: RouteLatLng[];
  startPoint: RouteLatLng;
  endPoint: RouteLatLng;
};
