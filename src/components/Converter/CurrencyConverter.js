// import React, { useState, useEffect } from "react";
// import "./CurrencyConverter.css";

// const CurrencyConverter = ({ currencyData }) => {
//   const [amount, setAmount] = useState("");
//   const [fromCurrency, setFromCurrency] = useState("");
//   const [toCurrency, setToCurrency] = useState("");
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     if (currencyData.length > 0) {
//       setFromCurrency(currencyData[0].abbreviation);
//       setToCurrency(currencyData[0].abbreviation);
//     }
//   }, [currencyData]);

//   const handleConvert = () => {
//     const from = currencyData.find(
//       (curr) => curr.abbreviation === fromCurrency
//     );
//     const to = currencyData.find((curr) => curr.abbreviation === toCurrency);

//     if (from && to && amount) {
//       const convertedAmount =
//         (amount * from.price) / from.scale / (to.price / to.scale);
//       setResult(convertedAmount.toFixed(4));
//     } else {
//       setResult("Ошибка конвертации");
//     }
//   };

//   return (
//     <div className="currency-converter">
//       <h2>Конвертер валют</h2>
//       <div>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Количество"
//         />
//         <select
//           value={fromCurrency}
//           onChange={(e) => setFromCurrency(e.target.value)}
//         >
//           {currencyData.map((currency) => (
//             <option key={currency.abbreviation} value={currency.abbreviation}>
//               {currency.abbreviation}
//             </option>
//           ))}
//         </select>
//         <span>в</span>
//         <select
//           value={toCurrency}
//           onChange={(e) => setToCurrency(e.target.value)}
//         >
//           {currencyData.map((currency) => (
//             <option key={currency.abbreviation} value={currency.abbreviation}>
//               {currency.abbreviation}
//             </option>
//           ))}
//         </select>
//         <button onClick={handleConvert}>Конвертировать</button>
//       </div>
//       {result !== null && (
//         <div className="result">
//           <h3>
//             Результат: {result} {toCurrency}
//           </h3>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrencyConverter;

// import React, { useState, useEffect } from "react";
// import "./CurrencyConverter.css";

// const CurrencyConverter = ({ currencyData }) => {
//   const initialValues = currencyData.reduce((acc, currency) => {
//     acc[currency.abbreviation] = "";
//     return acc;
//   }, {});

//   const [values, setValues] = useState(initialValues);
//   const [baseCurrency, setBaseCurrency] = useState("USD");
//   const [baseValue, setBaseValue] = useState(1);

//   useEffect(() => {
//     if (currencyData.length > 0) {
//       handleChange(baseCurrency, baseValue);
//     }
//   }, [currencyData]);

//   const handleChange = (abbreviation, value) => {
//     setBaseCurrency(abbreviation);
//     setBaseValue(value);

//     const fromCurrency = currencyData.find(
//       (currency) => currency.abbreviation === abbreviation
//     );

//     const newValues = currencyData.reduce((acc, currency) => {
//       if (currency.abbreviation === abbreviation) {
//         acc[currency.abbreviation] = value;
//       } else {
//         const convertedValue =
//           (value * fromCurrency.price) /
//           fromCurrency.scale /
//           (currency.price / currency.scale);
//         acc[currency.abbreviation] = convertedValue.toFixed(4);
//       }
//       return acc;
//     }, {});

//     setValues(newValues);
//   };

//   return (
//     <div className="currency-converter">
//       <h2>Конвертер валют</h2>
//       {currencyData.map((currency) => (
//         <div key={currency.abbreviation} className="converter-row">
//           <div className="currency-label">{currency.abbreviation}</div>
//           <input
//             type="number"
//             value={values[currency.abbreviation]}
//             onChange={(e) =>
//               handleChange(currency.abbreviation, e.target.value)
//             }
//             placeholder="0.00"
//           />
//           <div className="currency-name">{currency.name}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CurrencyConverter;
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { IconButton, TextField, MenuItem, Select } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import currencyStore from "../stores/CurrencyStore";
import "./CurrencyConverter.css";

const CurrencyConverter = observer(() => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    currencyStore.fetchCurrencyData();
  }, []);

  const handleChange = (abbreviation, value) => {
    if (value >= 0) {
      // Запрещаем отрицательные значения
      currencyStore.handleChange(abbreviation, value);
    }
  };

  const handleAddCurrency = () => {
    if (selectedCurrency) {
      currencyStore.addCurrency(selectedCurrency);
      setSelectedCurrency("");
    }
  };

  const availableCurrencies = currencyStore.currencyData
    .map((currency) => currency.abbreviation)
    .filter((abbr) => !currencyStore.selectedCurrencies.includes(abbr));

  return (
    <div className="currency-converter">
      <h2 className="name">Конвертер валют</h2>
      {currencyStore.selectedCurrencies.map((abbreviation) => {
        const currency = currencyStore.currencyData.find(
          (curr) => curr.abbreviation === abbreviation
        );
        return (
          <div key={abbreviation} className="converter-row">
            <div className="currency-label">{abbreviation}</div>
            <TextField
              type="number"
              value={currencyStore.conversionValues[abbreviation]}
              onChange={(e) => handleChange(abbreviation, e.target.value)}
              placeholder="0.00"
            />
            <div className="currency-name">{currency?.name}</div>
            {!currencyStore.defaultCurrencies.includes(abbreviation) && (
              <IconButton
                aria-label="delete"
                className="remove-btn"
                onClick={() => currencyStore.removeCurrency(abbreviation)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        );
      })}
      {availableCurrencies.length > 0 && (
        <div className="add-currency">
          <Select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Выберите валюту
            </MenuItem>
            {availableCurrencies.map((abbreviation) => (
              <MenuItem key={abbreviation} value={abbreviation}>
                {abbreviation}{" "}
                {
                  currencyStore.currencyData.find(
                    (curr) => curr.abbreviation === abbreviation
                  )?.name
                }
              </MenuItem>
            ))}
          </Select>
          <button className="add-currency-btn" onClick={handleAddCurrency}>
            Добавить валюту
          </button>
        </div>
      )}
    </div>
  );
});

export default CurrencyConverter;
