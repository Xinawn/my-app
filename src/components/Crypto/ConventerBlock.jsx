import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import "./CryptoCurrency.css";

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export default function ConventerBlock() {
  return (
    <Paper>
      <div className="select-conventor">
        <FormControl sx={{ m: 1 }} variant="standard">
          <TextField
            id="outlined-basic"
            label="Сумма"
            helperText="Введите сумму"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel
            id="demo-customized-select-label"
            helperText="Please select your currency"
          ></InputLabel>
          <TextField
            id="outlined-select-currency"
            select
            label="Валюта"
            defaultValue="EUR"
            helperText="Выберите валюту"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {/* <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={10}
        label="Age"
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl> */}
        </FormControl>
      </div>
      <div className="select-conventor">
        <FormControl sx={{ m: 1 }} variant="standard">
          <TextField
            id="outlined-basic"
            label="Сумма"
            helperText="Введите сумму"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel
            id="demo-customized-select-label"
            helperText="Please select your currency"
          ></InputLabel>
          <TextField
            id="outlined-select-currency"
            select
            label="Валюта"
            defaultValue="EUR"
            helperText="Выберите валюту"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </div>
    </Paper>
  );
}
