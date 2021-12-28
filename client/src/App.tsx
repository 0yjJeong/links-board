import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components';
import theme from './constants/theme';
import { BoardPage, BoardPageSaved, BoardPageWrapper, HomePage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='board' element={<BoardPage />} />
          <Route
            path='board/:code'
            element={<BoardPageWrapper Component={BoardPageSaved} />}
          />
        </Routes>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
