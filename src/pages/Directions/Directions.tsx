import { css } from "@emotion/react";

export type DirectionsProps = {};

function Directions(DirectionsProps: {}) {
  return (
    <div css={pageStyle}>
      <div css={contentStyle}>
        <span>directions</span>
      </div>
    </div>
  );
}

const pageStyle = css``;

const contentStyle = css``;

export default Directions;
