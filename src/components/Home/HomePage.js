import React from "react";
import "./HomePage.css";
import CurrencyConverter from "../Converter/CurrencyConverter";

// import CurrencyTable from "./components/API/CurrencyTable";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

const HomePage = () => {
  // const data = [
  //   { name: "Jan", usd: 4000, eur: 2400 },
  //   { name: "Feb", usd: 3000, eur: 1398 },
  //   { name: "Mar", usd: 2000, eur: 9800 },
  //   { name: "Apr", usd: 2780, eur: 3908 },
  //   { name: "May", usd: 1890, eur: 4800 },
  //   { name: "Jun", usd: 2390, eur: 3800 },
  //   { name: "Jul", usd: 3490, eur: 4300 },
  // ];

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Добро пожаловать в Валютный трекер</h1>
        <p>Будьте в курсе последних курсов валют.</p>
      </div>

      <div className="currency-table">
        <h2>Текущие курсы валют</h2>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс НБРБ</th>
              <th>Изменения</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>

      {/* <div className="currency-chart">
        <h2>График изменения курсов валют</h2>
        <LineChart width={600} height={400} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="usd" stroke="#8884d8" />
          <Line type="monotone" dataKey="eur" stroke="#82ca9d" />
        </LineChart>
      </div> */}

      <div className="news-updates">
        <h2>Последние новости и обновления</h2>
        {/* Render news and updates */}
      </div>

      <div className="home-converter">
        {/* <h2>Конвентер валют</h2> */}
        <CurrencyConverter/>
      </div>

      <div className="subscribe">
        <h2>Stay Updated</h2>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
