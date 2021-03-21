import { useEffect, useState } from "react";
import {
  useAutocompleteIndex,
  useResetAutocompleteIndex,
} from "../atoms/autocompleteIndex";

import { placeFeature } from "../lib/api/mapbox/searchPlaces";
import useSearchPlaceQuery from "./query/useSearchPlaceQuery";

export default function usePlaceAutoComplete(keyword: string) {
  const [prevData, setPrevData] = useState<placeFeature[] | null>(null);
  const { data } = useSearchPlaceQuery(keyword, {
    enabled: keyword !== "",
    staleTime: 600000, // 캐쉬 시간
  });
  const [selectedIndex, setSelectedIndex] = useAutocompleteIndex();
  const reset = useResetAutocompleteIndex();

  useEffect(() => {
    return reset;
  }, [reset]);

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setPrevData(data);
    }
  }, [data]);

  useEffect(() => {
    if (keyword === "") {
      setPrevData(null);
    }
    setSelectedIndex(-1);
  }, [keyword, setSelectedIndex]);

  const goUp = () => {
    // @ts-ignore
    if (!data || data.length === 0) return;
    if (selectedIndex === -1) {
      // @ts-ignore
      setSelectedIndex(data.length - 1);
      return;
    }
    setSelectedIndex(selectedIndex - 1);
  };

  const goDown = () => {
    // @ts-ignore
    if (!data || data.length === 0) return;
    // @ts-ignore
    if (selectedIndex === data.length - 1) {
      // unselect
      setSelectedIndex(-1);
      return;
    }
    setSelectedIndex(selectedIndex + 1);
  };

  return {
    results: data || prevData,
    selectedIndex,
    goUp,
    goDown,
    reset,
  };
}
