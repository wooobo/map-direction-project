import client from "./client";

// TODO env파일로 옴겨야지
const accessToken =
  "pk.eyJ1IjoiaXJvb29yaSIsImEiOiJja2w3Yjk4dGQycG5rMnVtczB1ZmUxNnoxIn0.4UhohTVUBeUVuUiV0Fi2Iw";

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
