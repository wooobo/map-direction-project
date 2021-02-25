import CustomMap from "../../lib/map";
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";

function Direction() {
  const [isMapRender, setIsMapRender] = useState(false);
  const mapKey: string = process.env.REACT_APP_MAPBOX_KEY as string;
  const mapStyle: string = process.env.REACT_APP_MAPBOX_STYLE as string;
  const mapWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("open1");

    if (!isMapRender) {
      new CustomMap({
        container: mapWrapper.current as HTMLElement, // HTMLElement
        accessToken: mapKey,
        mapStyle: mapStyle,
        lat: 37.544559,
        lng: 127.126817,
      });
      setIsMapRender(true);
    }
  }, [isMapRender, mapKey, mapStyle]);

  return (
    <div css={mapContainerStyle}>
      <div css={mapDivStyle} ref={mapWrapper} />
    </div>
  );
}

const mapContainerStyle = css`
  width: 100%;
  height: 100vh;
`;

const mapDivStyle = css`
  width: 100%;
  height: 100vh;
`;

export default Direction;
