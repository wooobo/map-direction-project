import { useEffect, useState } from "react";
import {
  RouteResponse,
  SearchRouteParams,
} from "../lib/api/mapbox/searchRoute";
import useSearchRouteQuery from "./query/useSearchRouteQuery";

export default function useSearchRoute(params: SearchRouteParams) {
  const [prevData, setPrevData] = useState<RouteResponse[] | null>(null);
  const { data } = useSearchRouteQuery(params, {
    enabled: params !== null,
    staleTime: 400, // 캐쉬 시간
  });

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setPrevData(data);
    }
  }, [data]);

  return {
    results: data || prevData,
  };
}
