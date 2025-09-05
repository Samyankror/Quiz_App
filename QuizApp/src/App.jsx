import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Result from "./pages/Result.jsx";
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
