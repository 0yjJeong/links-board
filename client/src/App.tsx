import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './components';
import { Board, BoardSaved } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='board' element={<Board />} />
        <Route path='board/:code' element={<BoardSaved />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
