// CurrencyDynamics.js

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import currencyStore from "../stores/CurrencyStore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Button } from "@mui/material";
import dayjs from "dayjs";
import "./CurrencyDynamics.css";

const CurrencyDynamics = observer(({ currency }) => {
  const [startDate, setStartDate] = useState(dayjs().subtract(30, "days"));
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    if (currency) {
      currencyStore.fetchCurrencyDynamics(currency.id, startDate, endDate);
    }
  }, [currency, startDate, endDate]);

  const handleFetchDynamics = () => {
    if (currency) {
      currencyStore.fetchCurrencyDynamics(currency.id, startDate, endDate);
    }
  };

  return (
    <div className="currency-dynamics">
      <h2>Динамика курса для {currency.name}</h2>
      <div className="date-pickers">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Дата начала"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Дата окончания"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={handleFetchDynamics}>
          Обновить
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {currencyStore.currencyDynamics.length > 0 ? (
            currencyStore.currencyDynamics.map((rate) => (
              <tr key={rate.Date}>
                <td>{new Date(rate.Date).toLocaleDateString()}</td>
                <td>{rate.Cur_OfficialRate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Данные не найдены</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

export default CurrencyDynamics;
