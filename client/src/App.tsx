import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components';
import theme from './constants/theme';
import { BoardPageNew, BoardPageSaved, HomePage } from './pages';
import { Wrapper } from './additional-components';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='board'>
            <Route index element={<BoardPageNew />} />
            <Route
              path=':code'
              element={<Wrapper Component={BoardPageSaved} />}
            />
          </Route>
        </Routes>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
