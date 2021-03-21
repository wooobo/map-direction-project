import { css } from "@emotion/react";
import Map from "../../components/Map/Direction";

export type DirectionsProps = {};

// eslint-disable-next-line no-empty-pattern
function Directions({}: DirectionsProps) {
  return (
    <div css={pageStyle}>
      <div css={contentStyle}>
        <Map />
      </div>
    </div>
  );
}

const pageStyle = css``;

const contentStyle = css``;

export default Directions;
