import client from "./client";
import { accessToken } from "./client";

export async function searchRoute(params: SearchRouteParams) {
  const paths = params.wayPoints.map((x) => `${x.lng},${x.lat}`).join(";");
  const response = await client.get<RouteResponse>(
    "/directions/v5/mapbox/cycling/" + paths,
    {
      params: {
        overview: "full",
        steps: true,
        geometries: "geojson",
        access_token: accessToken,
        exclude: "ferry",
      },
    }
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
