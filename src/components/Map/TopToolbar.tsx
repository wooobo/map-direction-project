import { css } from "@emotion/react";
import { useState } from "react";
import Input from "../Input";
import * as mapboxSearchApi from "../../lib/map/api";
import SearchDropbox from "./SearchDropbox";

export type TopToolbarProps = {
  children: React.ReactNode;
};

export default function TopToolbar({ children }: TopToolbarProps) {
  return <div>{children}</div>;
}

function SearchInput() {
  const [keyword, setKeyword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inpValue = e.target.value;
    setKeyword(inpValue);
    if (inpValue !== "") {
      mapboxSearchApi
        .fetchAddressSearch({
          search_text: inpValue,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("errrrr", err); // Error: Request is failed
        });
    }
  };

  return (
    <div css={topToolbarStyle}>
      <Input
        placeholder="장소 검색을 할 수 있습니다."
        value={keyword}
        onChange={onChange}
        css={searchInputStyle}
      />
      <SearchDropbox
        searchItems={[
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
          {
            addrName: "asd",
            lng: 1,
            lat: 2,
          },
        ]}
      />
    </div>
  );
}

TopToolbar.SearchInput = SearchInput;

const topToolbarStyle = css`
  display: flex;
  width: 100%;
`;

const searchInputStyle = css`
  flex-basis: 80%;
  border: 0;
`;
