import { css } from "@emotion/react";
import palette from "../../lib/palette";

export type SearchListItem = {
  addrName: String;
  lng: number;
  lat: number;
};

export type SearchDropboxProps = {
  searchItems: SearchListItem[] | null;
};

function SearchDropbox({ searchItems }: SearchDropboxProps) {
  if (!searchItems || searchItems.length === 0) return null;
  return (
    <div css={searchListDropbox}>
      <ul>
        {searchItems.map((option) => (
          <li>{option.addrName}</li>
        ))}
      </ul>
    </div>
  );
}

const searchListDropbox = css`
  position: absolute;
  top: 50px;
  left: 0.25rem;
  right: 45rem;
  border-radius: 0.25rem;
  background-color: ${palette.white};
  box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 10px -3px rgba(0, 0, 0, 0.5);

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
    & > li {
      border-bottom: 1px solid ${palette.grey[200]};
      line-height: 1.5rem;
      padding: 0.5rem 0.8rem;
      overflow: hidden;
      &:hover {
        background-color: ${palette.grey[100]};
      }
    }
  }
`;

export default SearchDropbox;
