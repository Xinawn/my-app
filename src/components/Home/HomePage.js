import React from "react";
import CurrencyConverter from "../Converter/CurrencyConverter";
import SmallCurrencyTable from "../API/SmallCurrencyTable";
// import CurrencyConverterr from "../stores/conventerStore";
// import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Добро пожаловать в Валютный трекер</h1>
        <p>Будьте в курсе последних курсов валют.</p>
      </div>

      <div className="small-currency-table">
        <SmallCurrencyTable />
      </div>

      <div className="home-converter">
        <CurrencyConverter />
      </div>

      <div className="home-converter">
        {/* <CurrencyConverterr currencyData={filteredData} /> */}
      </div>

      <div className="subscribe">
        <h2>Оставайтесь в курсе</h2>
        <form>
          <input type="email" placeholder="Введите ваш email" />
          <button type="submit">Подписаться</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
