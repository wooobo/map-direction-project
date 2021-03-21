import client from "./client";
import { accessToken } from "./client";

export async function searchPlaces(keyword: string) {
  const response = await client.get<SearchPlaceResult>(
    `/geocoding/v5/mapbox.places/${keyword}.json?access_token=${accessToken}`
  );

  return response.data.features;
}

export type placeFeature = {
  id: string;
  matching_place_name: string;
  place_name: string;
};
export type SearchPlaceResult = {
  features: placeFeature[];
};
