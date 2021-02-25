import { css } from "@emotion/react";

export type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>;
}

export type SideProps = {
  children: React.ReactNode;
};

function Side({ children }: SideProps) {
  return <aside css={sidebarStyle}>{children}</aside>;
}

export type MainProps = {
  children: React.ReactNode;
};

function Main({ children }: MainProps) {
  return <main css={mainStyle}>{children}</main>;
}

AppLayout.Side = Side;
AppLayout.Main = Main;

const sidebarStyle = css`
  width: 16.25rem;
  height: 100%;
  position: fixed;
  display: flex;
  padding: 2.5rem;
`;

const mainStyle = css`
  margin-left: 16.25rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
`;
