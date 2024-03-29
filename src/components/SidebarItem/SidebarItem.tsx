import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";
import palette from "../../lib/palette";

export type SidebarItemProps = {
  text: string;
  to: string;
};

function SidebarItem({ text, to }: SidebarItemProps) {
  return (
    <li css={itemStyle}>
      <NavLink to={to} css={linkStyle} exact>
        <span>{text}</span>
      </NavLink>
    </li>
  );
}

const itemStyle = css``;

const linkStyle = css`
  width: 100%;
  border-radius: 0.5rem;
  height: 3.75rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  color: ${palette.blueGrey[600]};
  text-decoration: none;
  &:hover {
    background: ${palette.red[50]};
  }
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
  span {
    font-size: 1.125rem;
    margin-left: 1rem;
  }
  &.active {
    color: ${palette.blueGrey[900]};
    span {
      font-weight: bold;
    }
  }
`;

export default SidebarItem;
