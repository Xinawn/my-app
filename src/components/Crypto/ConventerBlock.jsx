// import React from "react";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import "./CryptoCurrency.css";

// const currencies = [
//   {
//     value: "USD",
//     label: "$",
//   },
//   {
//     value: "EUR",
//     label: "€",
//   },
//   {
//     value: "BTC",
//     label: "฿",
//   },
//   {
//     value: "JPY",
//     label: "¥",
//   },
// ];

// export default function ConventerBlock() {
//   return (
//     <Paper>
//       <div className="select-conventor">
//         <FormControl sx={{ m: 1 }} variant="standard">
//           <TextField
//             id="outlined-basic"
//             label="Сумма"
//             helperText="Введите сумму"
//           />
//         </FormControl>
//         <FormControl sx={{ m: 1 }} variant="standard">
//           <InputLabel
//             id="demo-customized-select-label"
//             helperText="Please select your currency"
//           ></InputLabel>
//           <TextField
//             id="outlined-select-currency"
//             select
//             label="Валюта"
//             defaultValue="EUR"
//             helperText="Выберите валюту"
//           >
//             {currencies.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </FormControl>
//       </div>
//       <div className="select-conventor">
//         <FormControl sx={{ m: 1 }} variant="standard">
//           <TextField
//             id="outlined-basic"
//             label="Сумма"
//             helperText="Введите сумму"
//           />
//         </FormControl>
//         <FormControl sx={{ m: 1 }} variant="standard">
//           <InputLabel
//             id="demo-customized-select-label"
//             helperText="Please select your currency"
//           ></InputLabel>
//           <TextField
//             id="outlined-select-currency"
//             select
//             label="Валюта"
//             defaultValue="EUR"
//             helperText="Выберите валюту"
//           >
//             {currencies.map((option) => (
//               <MenuItem key={option.value} value={option.value}>
//                 {option.label}
//               </MenuItem>
//             ))}
//           </TextField>
//         </FormControl>
//       </div>
//     </Paper>
//   );
// }

// CurrencyConverter.jsx
import React from "react";
import { observer } from "mobx-react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import currencyConverterStore from "../../stores/store";
import "./CryptoCurrency.css";

const CurrencyConverter = observer(() => {
  const currencies = Object.keys(currencyConverterStore.rates);

  const handleFromCurrencyChange = (event) => {
    currencyConverterStore.setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    currencyConverterStore.setToCurrency(event.target.value);
  };

  const handleFromAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      currencyConverterStore.setFromAmount(amount);
    }
  };

  const handleToAmountChange = (event) => {
    const amount = parseFloat(event.target.value);
    if (!isNaN(amount)) {
      currencyConverterStore.setToAmount(amount);
    }
  };

  return (
    <Paper>
      <div className="select-conventor">
        <FormControl sx={{ m: 1 }} variant="standard">
          <TextField
            id="outlined-basic"
            label="Сумма"
            helperText="Введите сумму"
            value={currencyConverterStore.fromAmount}
            onChange={handleFromAmountChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <TextField
            id="outlined-select-currency"
            select
            label="Валюта"
            value={currencyConverterStore.fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>
      <div className="select-conventor">
        <FormControl sx={{ m: 1 }} variant="standard">
          <TextField
            id="outlined-basic"
            label="Сумма"
            value={currencyConverterStore.toAmount || currencyConverterStore.convertedAmount}
            onChange={handleToAmountChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <TextField
            id="outlined-select-currency"
            select
            label="Валюта"
            value={currencyConverterStore.toCurrency}
            onChange={handleToCurrencyChange}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>
    </Paper>
  );
});

export default CurrencyConverter;
