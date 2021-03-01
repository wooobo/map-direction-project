import React, { useEffect, useMemo, useRef, useState } from "react";
import { css, Global } from "@emotion/react";
import CustomMap from "../../lib/map";

function mapInit() {
  return new CustomMap();
}

function Direction() {
  const [isMapRender, setIsMapRender] = useState(false);
  const mapKey: string = process.env.REACT_APP_MAPBOX_KEY as string;
  const mapStyle: string = process.env.REACT_APP_MAPBOX_STYLE as string;
  const mapWrapper = useRef<HTMLDivElement | null>(null);
  const map = useMemo(() => mapInit(), []);

  useEffect(() => {
    if (!isMapRender) {
      map.builder({
        container: mapWrapper.current as HTMLElement, // HTMLElement
        accessToken: mapKey,
        mapStyle: mapStyle,
        lat: 37.565547,
        lng: 126.977999,
      });
      setIsMapRender(true);
    }
  }, [map, isMapRender, mapKey, mapStyle]);

  return (
    <div css={mapContainerStyle}>
      <Global styles={globalStyle} />
      <div css={mapControllerStyle}>
        <input type="text" />
      </div>
      <div css={mapDivStyle} ref={mapWrapper} />
    </div>
  );
}
const topHeight = "50px";

const globalStyle = css`
  * .mapboxgl-control-container {
    display: none;
  }
`;

const mapContainerStyle = css`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const mapControllerStyle = css`
  position: absolute;
  height: ${topHeight};
  top: 0;
  left: 0;
  right: 0;
  background-color: darkkhaki;
`;

const mapDivStyle = css`
  width: 100%;
  height: 100vh;
  padding-top: ${topHeight};
`;

export default Direction;
