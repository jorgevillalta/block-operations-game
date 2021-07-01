import React from 'react';
import { Switch, Route, Redirect } from 'wouter';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components/macro';
import DebugInfoLayout from './components/DebugInfoLayout';
import { OperationPage, OneOperandPage } from './pages';
import { routes } from './constants/Routes';
import { breakpoints } from './constants/MediaBreakpoints';

// TODO Move to theme.js
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

// TODO Move to theme.js
const theme = {
  colors: {
    default: '#ffffff',
    blockRed: '#ff6d6d',
    blockBlue: '#37c3ff',
    blockRedLight: '#ffeded',
    blockBlueLight: '#e6f8ff',
    success: '#aaff00',
    successLight: 'f4ffdf',
    primary: '#e2a0ff',
    primaryLight: '#f4dbff',
    error: '#b50000',
    errorLight: '#c8c8c8',
    selectionPrimary: '#db6d92',
    selectionSecondary: '#ffa0a0',
    action: '#df6000',
    textPrimary: '#5d2e8c'
  }
};

const Root = styled.div`
  && {
    display: grid;
    height: 100vh;
    width: 100vw;

    place-items: center;
    background-color: rgb(240, 240, 240);
  }
`;

const Main = styled.div`
  && {
    height: 98vh;
    width: 98vw;
    padding: 1vh 1vw;

    background-color: white;

    @media (min-width: ${breakpoints.board.width}) {
      width: calc(${breakpoints.board.width} - 2vw);
      // padding: 10px;

      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }

    @media (min-height: ${breakpoints.board.height}) {
      height: calc(${breakpoints.board.height} - 2vh);

      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

//
export const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition
    }
  ]
};

//
function App() {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider options={HTML5toTouch}>
        <Root>
          <DebugInfoLayout />
          <Main>
            <Switch>
              <Route path={routes.ONE_OPERAND} component={OneOperandPage} />
              <Route path={routes.OPERATION} component={OperationPage} />
              <Route>
                <Redirect to={routes.OPERATION} />
              </Route>
            </Switch>
          </Main>
          <GlobalStyle />
        </Root>
      </DndProvider>
    </ThemeProvider>
  );
}

export default App;
