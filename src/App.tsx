import React from 'react'
import { Global, css } from '@emotion/react'
import { Route, Switch } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Sidebar from './components/Sidebar'
import DebugObserver from './components/DebugObserver/DebugObserver'

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
                        <Route path={['/', '/test']} exact>
                            <div>ok test</div>
                        </Route>
                    </Switch>
                </AppLayout.Main>
            </AppLayout>
            <Global styles={globalStyle} />
        </>
    )
}

const globalStyle = css`
  html {
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
`

export default App
