import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CurrencyTable.css";

const CurrencyTable = () => {
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.nbrb.by/exrates/rates?periodicity=0")
      .then(({ data }) => {
        const currencys = data.map((currency) => {
          const obj = {
            name: currency.Cur_Name,
            abbreviation: currency.Cur_Abbreviation,
            scale: currency.Cur_Scale,
            price: currency.Cur_OfficialRate,
            id: currency.Cur_Id,
          };
          return obj;
        });
        setCurrencyData(currencys);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error);
      });
  }, []);

  return (
    <div className="currency-table">
      <h2>Таблица курсов валют</h2>
      <table>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Код</th>
            <th>Единиц</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.length > 0 ? (
            currencyData.map((currency) => (
              <tr key={currency.id}>
                <td>{currency.name}</td>
                <td>{currency.abbreviation}</td>
                <td>{currency.scale}</td>
                <td>{currency.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Загрузка данных...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
