// import React, { useState } from "react";

// const CurrencyConverterr = ({ currencyData }) => {
//   const [baseCurrency, setBaseCurrency] = useState("USD");
//   const [baseAmount, setBaseAmount] = useState(1);

//   const handleBaseCurrencyChange = (event) => {
//     setBaseCurrency(event.target.value);
//   };

//   const handleBaseAmountChange = (event) => {
//     setBaseAmount(event.target.value);
//   };

//   return (
//     <div className="currency-converter">
//       <h2>Конвертер валют</h2>
//       <div>
//         <label>
//           Базовая валюта:
//           <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
//             {currencyData.map((currency) => (
//               <option key={currency.id} value={currency.abbreviation}>
//                 {currency.abbreviation}
//               </option>
//             ))}
//           </select>
//         </label>
//         <input
//           type="number"
//           value={baseAmount}
//           onChange={handleBaseAmountChange}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Валюта</th>
//             <th>Курс</th>
//             <th>Конвертированная сумма</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currencyData.map((currency) => {
//             const convertedAmount =
//               (baseAmount * currency.price) /
//               currencyData.find(
//                 (baseCurrencyItem) =>
//                   baseCurrencyItem.abbreviation === baseCurrency
//               ).price;
//             return (
//               <tr key={currency.id}>
//                 <td>{currency.abbreviation}</td>
//                 <td>{currency.price}</td>
//                 <td>{convertedAmount.toFixed(2)}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CurrencyConverterr;



import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import currencyStore from "./CurrencyStore";
// import "./CurrencyConverter.css";

const CurrencyConverter = observer(() => {
  useEffect(() => {
    currencyStore.fetchCurrencyData();
  }, []);

  const handleInputChange = (event, currency) => {
    const value = event.target.value;
    currencyStore.setConversionValue(value, currency);
  };

  return (
    <div className="currency-converter">
      <h2>Конвертер валют</h2>
      {currencyStore.currencyData.map((currency) => (
        <div key={currency.id}>
          <label>{currency.abbreviation}</label>
          <input
            type="number"
            value={currencyStore.conversionValues[currency.abbreviation] || ""}
            onChange={(event) => handleInputChange(event, currency.abbreviation)}
          />
        </div>
      ))}
    </div>
  );
});

export default CurrencyConverter;
