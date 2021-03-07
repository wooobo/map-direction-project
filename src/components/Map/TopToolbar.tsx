import { css } from "@emotion/react";
import { useState } from "react";
import Input from "../Input";
import * as mapboxSearchApi from "../../lib/map/api";

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
    <Input
      placeholder="장소 검색을 할 수 있습니다."
      value={keyword}
      onChange={onChange}
      css={searchInputStyle}
    />
  );
}

TopToolbar.SearchInput = SearchInput;

const searchInputStyle = css`
  flex-basis: 400px;
  border: 0;
`;
