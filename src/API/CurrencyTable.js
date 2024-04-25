import React, { useState, useEffect } from "react";
import "./CurrencyTable.css";

// const CurrencyTable = () => {
//   const [currencyData, setCurrencyData] = useState([]);

//   useEffect(() => {
//     const fetchCurrencyData = async () => {
//       try {
//         const response = await fetch(
//           "https://api.nbrb.by/exrates/currencies"
//         ); // Замените на реальный API-endpoint
//         const data = await response.json();
//         setCurrencyData(data);
//       } catch (error) {
//         console.error("Ошибка при получении данных:", error);
//       }
//     };

//     fetchCurrencyData();
//   }, []);

//   return (
//     <div>
//       <h2>Таблица курсов валют</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Валюта</th>
//             <th>Курс</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currencyData.length > 0 ? (
//             currencyData.map((currency) => (
//               <tr key={currency.code}>
//                 <td>{currency.code}</td>
//                 <td>{currency.rate}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="2">Загрузка данных...</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CurrencyTable;

function CurrencyTable() {
  const [rates, setRates] = useState();
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("USD");
  const [output, setOutput] = useState();

  const getRates = async () => {
    // fetch the data from API
    const response = await fetch("https://v6.exchangerate-api.com/v6/cb792cdfbdde7dc5d4d59d59/latest/USD").then(
      (response) => response.json()
    );

    // save the rates in the state
    if (response.result === "success") {
      setRates(response.conversion_rates);
      setRatesFetched(true);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const calculateOutput = async () => {
    // fetch the selected from currency rates
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/cb792cdfbdde7dc5d4d59d59/latest${fromCurrency}`
    ).then((response) => response.json());
    const fetchedRates = response.conversion_rates;
    const CurrencyRate = fetchedRates[toCurrency];
    const output = amount * CurrencyRate;
    setOutput(output);
  };

  return (
    <div className="container-table">
      <div className="input-amount">
        <label>Amount:</label>
        <input
          type="number"
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </div>

      <div className="input-from">
        <label>From:</label>
        <select
          id="from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>USD</option>
          )}
        </select>
      </div>

      <div className="input-to">
        <label>To:</label>
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option defaultValue>EUR</option>
          )}
        </select>
      </div>
      <button className="btn" onClick={() => calculateOutput()}>
        Calculate
      </button>
      <div className="output">
        <label>Output: {output}</label>
      </div>
    </div>
  );
}
export default CurrencyTable;
