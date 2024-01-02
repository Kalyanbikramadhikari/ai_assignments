import Missionaries from './Missionaries';
import EightPuzzle from './EightPuzzle';
import EightPuzzleDFS from './EightPuzzleDFS';
import Home from './Home';
// route
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EightPuzzleA from './EightPuzzleAStar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/missionaries-cannibals" element={<Missionaries />} />
        <Route path="/eight-puzzle-bfs" element={<EightPuzzle />} />
        <Route path="/eight-puzzle-dfs" element={<EightPuzzleDFS />} />
        <Route path="/eight-puzzle-a-star" element={<EightPuzzleA />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
