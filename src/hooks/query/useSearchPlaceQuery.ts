import { useQuery } from "react-query";
import { searchPlaces } from "../../lib/api/mapbox/searchPlaces";
import { QueryOptionsOf } from "../../lib/utils/types";

export default function useSearchPlaceQuery(
  keyword: string,
  options: QueryOptionsOf<typeof searchPlaces> = {}
) {
  return useQuery(createKey(keyword), () => searchPlaces(keyword), options);
}

const createKey = (keyword: string) => ["search_places", keyword];
useSearchPlaceQuery.createKey = createKey;
