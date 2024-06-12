import React, { useEffect } from "react";
import { observer } from "mobx-react";
import currencyStore from "../stores/CurrencyStore";
import "./SmallCurrencyTable.css";

const SmallCurrencyTable = observer(() => {
  const filterCurrencies = ["USD", "EUR", "RUB", "PLN", "CNY"];

  useEffect(() => {
    currencyStore.fetchCurrencyData();
  }, []);

  const filteredData = currencyStore.currencyData.filter((currency) =>
    filterCurrencies.includes(currency.abbreviation)
  );

  return (
    <div className="small-currency-table">
      <table>
        <thead>
          <tr>
            <th>Имя валюты</th>
            <th>Валюта</th>
            <th>Курс НБРБ</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((currency) => (
              <tr key={currency.id}>
                <td>{currency.name}</td>
                <td>{currency.abbreviation}</td>
                <td>{currency.price.toFixed(4)}</td>
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
});

export default SmallCurrencyTable;
