import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Home/HomePage";
import CrypoCyrrency from "./Crypto/CryptoCurrency";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    // <div>
    //   <Navbar />
    //   {/* <HomePage /> */}
    //   <Route path="/" exact component={HomePage} />
    // </div>
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
