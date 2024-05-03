import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Home/HomePage";
import CrypoCyrrency from "./components/Crypto/CryptoCurrency";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/crypto" element={<CrypoCyrrency />} />
      {/* Другие маршруты */}
    </Routes>
  </Router>
  );
}

export default App;
