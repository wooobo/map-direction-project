import { css } from "@emotion/react";
import palette from "../../lib/palette";
import { placeFeature } from "../../lib/api/mapbox/searchPlaces";
import useOnClickOutside from "use-onclickoutside";
import { useRef } from "react";

export type SearchDropboxProps = {
  results: placeFeature[] | null;
  selectedIndex: number;
  onClose: Parameters<typeof useOnClickOutside>[1];
  visible: boolean;
};

function SearchDropbox({
  results,
  selectedIndex,
  onClose,
  visible,
}: SearchDropboxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, onClose);
  if (!visible || !results || results.length === 0) return null;
  return (
    <div css={searchListDropbox}>
      <ul>
        {results.map((feature, index) => (
          <li key={index} css={item(index === selectedIndex)}>
            {feature.place_name}
          </li>
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
  width: 80%;
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
const item = (selected: boolean) => css`
  ${selected &&
  css`
    background-color: ${palette.grey[100]};
  `}
`;

export default SearchDropbox;
