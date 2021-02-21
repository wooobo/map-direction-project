import React from "react";
import { Global, css } from "@emotion/react";
import { Route, Switch } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Sidebar from "./components/Sidebar";
import DebugObserver from "./components/DebugObserver/DebugObserver";
import Directions from "./pages/Directions";

function App() {
  return (
    <>
      <DebugObserver />
      <AppLayout>
        <AppLayout.Side>
          <Sidebar />
        </AppLayout.Side>
        <AppLayout.Main>
          <Switch>
            <Route path={["/", "/test"]} exact>
              <Directions />
            </Route>
          </Switch>
        </AppLayout.Main>
      </AppLayout>
      <Global styles={globalStyle} />
    </>
  );
}

const globalStyle = css`
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
`;

export default App;
