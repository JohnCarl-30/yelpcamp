import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Campgrounds from "./pages/Campgrounds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campgrounds" element={<Campgrounds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
