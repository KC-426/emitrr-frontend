import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './pages/User'
import DeckOfCards from './pages/DeckOfCards'
import Login from "./pages/Login"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/start-game" element={<DeckOfCards />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
