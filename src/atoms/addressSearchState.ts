import { useCallback, useEffect } from "react";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
// import produce from "immer";

export type SearchParams = {
  keyword: string;
  lng: number;
  lat: number;
};

export const placeSearchState = atom<SearchParams>({
  key: "assetsState",
  default: {
    keyword: "test keyword",
    lng: 1,
    lat: 2,
  },
});

export const placeParamsKeyword = selector({
  key: "placesParamsKeyword",
  get: ({ get }) => {
    return get(placeSearchState);
  },
});

export function usePlaceActions() {
  const set = useSetRecoilState(placeSearchState);
  const reset = useResetRecoilState(placeSearchState);

  const append = useCallback(
    (searchParams: SearchParams) => {
      set((prev) => {
        return prev;
      });
    },
    [set]
  );

  const updateParams = useCallback(
    (arg: SearchParams) => {
      set((prev) => {
        console.log("update params ", prev);
        return prev;
      });
    },
    [set]
  );

  return [set, reset, append, updateParams];
}

export function usePlaceSearchActionView() {
  return useRecoilValue(placeSearchState);
}

export function usePlaceSearchState() {
  return useRecoilState(placeSearchState);
}

export function useResetPlaceSearchUnmountEffect() {
  const reset = useResetRecoilState(placeSearchState);
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);
}
