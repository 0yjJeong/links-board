import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Base } from './components';
import theme from './constants/theme';
import { BoardPage, BoardPageSaved, BoardPageWrapper, HomePage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='board' element={<Base />}>
            <Route index element={<BoardPage />} />
            <Route
              path=':code'
              element={<BoardPageWrapper Component={BoardPageSaved} />}
            />
          </Route>
        </Routes>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
