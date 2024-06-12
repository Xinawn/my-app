// CurrencyTable.js

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import currencyStore from "../stores/CurrencyStore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import CurrencyDynamics from "./CurrencyDynamics";
import dayjs from "dayjs";
import "./CurrencyTable.css";

const CurrencyTable = observer(() => {
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    currencyStore.fetchCurrencyData();
  }, []);

  const handleDateChange = (date) => {
    currencyStore.setSelectedDate(date);
  };

  const handleCurrencyClick = (currency) => {
    setSelectedCurrency(currency);
    const endDate = dayjs();
    const startDate = endDate.subtract(30, "days");
    currencyStore.fetchCurrencyDynamics(currency.id, startDate, endDate);
  };

  const sortedCurrencyData = () => {
    const defaultCurrencies = currencyStore.defaultCurrencies;
    const defaultCurrencyData = currencyStore.currencyData.filter((currency) =>
      defaultCurrencies.includes(currency.abbreviation)
    );
    const otherCurrencyData = currencyStore.currencyData.filter(
      (currency) => !defaultCurrencies.includes(currency.abbreviation)
    );

    return [...defaultCurrencyData, ...otherCurrencyData];
  };

  return (
    <div className="currency-table">
      <h2>Таблица курсов валют</h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Выберите дату"
          value={currencyStore.selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
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
          {currencyStore.currencyData.length > 0 ? (
            sortedCurrencyData().map((currency) => (
              <tr
                key={currency.id}
                onClick={() => handleCurrencyClick(currency)}
              >
                <td>{currency.name}</td>
                <td>{currency.abbreviation}</td>
                <td>{currency.scale}</td>
                <td>{currency.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Загрузка данных...</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedCurrency && <CurrencyDynamics currency={selectedCurrency} />}
    </div>
  );
});

export default CurrencyTable;
