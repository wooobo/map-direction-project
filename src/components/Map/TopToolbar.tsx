import { css } from "@emotion/react";
import { useState } from "react";
import Input from "../Input";

export type TopToolbarProps = {
  children: React.ReactNode;
};

export default function TopToolbar({ children }: TopToolbarProps) {
  return <div>{children}</div>;
}

export type SearchInputProps = {};

function SearchInput({}: SearchInputProps) {
  const [keyword, setKeyword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
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
