import { useQuery } from "react-query";
import {
  searchRoute,
  SearchRouteParams,
} from "../../lib/api/mapbox/searchRoute";
import { QueryOptionsOf } from "../../lib/utils/types";
import hash from "object-hash";

export default function useSearchPlaceQuery(
  params: SearchRouteParams,
  options: QueryOptionsOf<typeof searchRoute> = {}
) {
  return useQuery(createKey(hash(params)), () => searchRoute(params), options);
}

const createKey = (keyword: string) => ["search_places", keyword];
useSearchPlaceQuery.createKey = createKey;
