import { css } from "@emotion/react";
import palette from "../../lib/palette";
import SidebarItem from "../SidebarItem";

function Sidebar() {
  return (
    <div css={sidebarStyle}>
      <div className="logo">사이클웹</div>
      <ul css={menuStyle}>
        <SidebarItem text="길찾기" to="/" />
        {/*<SidebarItem text="Workspace" to="/workspace" />*/}
        {/*<SidebarItem text="Explore" to="/explore" />*/}
      </ul>
    </div>
  );
}

const sidebarStyle = css`
  flex: 1;

  .logo {
    font-weight: bold;
    font-size: 1.5rem;
    color: ${palette.blueGrey[900]};
  }
`;

const menuStyle = css`
  list-style: none;
  padding: 0;
  margin-top: 5.625rem;
  margin-left: -1rem;
`;

export default Sidebar;
