import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/Home/HomePage";
import CryptoTable from "./components/Crypto/CryptoTable";
import ConventerBlock from "./components/Crypto/ConventerBlock";
import CryptoCurrency from "./components/Crypto/CryptoCurrency";
import CurrencyTable from "./components/API/CurrencyTable";
import CurrencyConverter from "./components/Converter/CurrencyConverter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crypto" element={<CryptoCurrency />} />
        <Route path="/currency" element={<CurrencyTable />} />
        <Route path="/crypto/table" element={<CryptoTable />} />
        <Route path="/crypto/converter" element={<ConventerBlock />} />
        <Route path="/converter" element={<CurrencyConverter />} />
        {/* Другие маршруты */}
      </Routes>
    </Router>
  );
}

export default App;
