import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, MenuItem } from "@mui/material";
import "./CurrencyConverter.css";

const CurrencyConverter = () => {
  // Определение переменных состояния для хранения данных
  const [currencyData, setCurrencyData] = useState([]); // Состояние для хранения извлеченных данных о валютах
  const [baseCurrency, setBaseCurrency] = useState("BYN"); // Состояние для хранения выбранной базовой валюты
  const [targetCurrency, setTargetCurrency] = useState("USD"); // Состояние для хранения выбранной целевой валюты
  const [amount, setAmount] = useState(); // Состояние для хранения введенной пользователем суммы
  const bynCurrency = {
    name: "Белорусский рубль",
    abbreviation: "BYN",
    scale: 1,
    price: 1,
    id: "BYN",
  };

  // Извлечение данных о валюте из API при монтировании компонента
  useEffect(() => {
    axios
      .get("https://api.nbrb.by/exrates/rates?periodicity=0") // Выполнение API-запроса по указанному URL
      .then(({ data }) => {
        // Обработка успешного ответа
        const currencies =[bynCurrency, ...data.map((currency) => {
          // Преобразование данных ответа в формат, подходящий для конвертера
          const obj = {
            name: currency.Cur_Name, // Хранение названия валюты
            abbreviation: currency.Cur_Abbreviation, // Хранение аббревиатуры валюты
            scale: currency.Cur_Scale, // Хранение масштаба валюты (не используется в этой реализации)
            price: currency.Cur_OfficialRate, // Хранение курса валюты
            id: currency.Cur_Id, // Хранение ID валюты
          };
          return obj;
        })];
        setCurrencyData(currencies); // Обновление состояния обработанными данными о валюте
      })
      .catch((error) => {
        // Обработка ошибок API-запроса
        console.error("Ошибка при извлечении данных о валюте:", error);
      });
  }); // Запустить этот эффект только один раз при монтировании компонента

  // Функция обработки изменений выбора базовой валюты
  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value); // Обновление состояния выбранной базовой валютой
  };

  // Функция обработки изменений выбора целевой валюты
  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value); // Обновление состояния выбранной целевой валютой
  };

  // Функция обработки изменений ввода суммы
  const handleAmountChange = (event) => {
    setAmount(event.target.value); // Обновление состояния введенной суммой
  };

  // Функция расчета конвертированной суммы
  const calculateConvertedAmount = () => {
    if (!amount || isNaN(amount)) {
      // Проверка, является ли сумма допустимой (не пустой или NaN)
      return ""; // Возвращает пустую строку, если сумма недопустима
    }

    // Поиск курсов валют для выбранных валют
    const baseRate = currencyData.find(
      (currency) => currency.abbreviation === baseCurrency
    ).price;
    const targetRate = currencyData.find(
      (currency) => currency.abbreviation === targetCurrency
    ).price;

    // Расчет конвертированной суммы по формуле
    const convertedAmount = (amount * targetRate) / baseRate;

    // Возвращение конвертированной суммы с двумя десятичными знаками
    return convertedAmount.toFixed(3);
  };

  return (
    <div className="currency-converter">
      <h2>Конвертер валют</h2>

      <div className="currency-selection">
        {/* Выбор базовой валюты */}
        <TextField
          id="base-currency"
          label="Валюта"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
          select
          variant="outlined"
        >
          {/* Отображение вариантов валюты из состояния */}
          {currencyData.map((currency) => (
            <MenuItem key={currency.id} value={currency.abbreviation}>
              {currency.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="amount-input">
        {/* Ввод суммы */}
        <TextField
          id="amount"
          label="Сумма"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          variant="outlined"
        />
      </div>

      <div className="currency-selection">
        {/* Выбор целевой валюты */}
        <TextField
          id="target-currency"
          label="Валюта"
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
          select
          variant="outlined"
        >
          {/* Отображение вариантов валюты из состояния */}
          {currencyData.map((currency) => (
            <MenuItem key={currency.id} value={currency.abbreviation}>
              {currency.name}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="converted-amount">
        {/* Отображение конвертированной суммы */}
        {amount
          ? `${targetCurrency} ${calculateConvertedAmount()}`
          : "Введите сумму"}
      </div>
    </div>
  );
};

export default CurrencyConverter;
