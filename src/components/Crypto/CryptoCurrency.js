import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
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

export default function CryptoCurrency() {
  return (
    <Container maxWidth="lg" className="crypto-container">
      <Grid container spacing={3}>
        <Grid xs={7}>
          <Paper>xs=8</Paper>
        </Grid>
        <Grid xs={5}>
          <Paper>
            <div className="select-conventor">
              <FormControl sx={{ m: 1 }} variant="standard">
                <TextField
                  id="outlined-basic"
                  label="Валюта"
                  // variant="outlined"
                />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard">
                {/* <InputLabel
                  id="demo-customized-select-label"
                  helperText="Please select your currency"
                ></InputLabel>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}
                <FormControl fullWidth>
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
                </FormControl>
              </FormControl>
            </div>
            <div className="select-conventor">
              <FormControl sx={{ m: 1 }} variant="standard">
                <TextField id="outlined-basic" label="Валюта" />
              </FormControl>
              <FormControl sx={{ m: 1 }} variant="standard">
                <InputLabel
                  id="demo-customized-select-label"
                  helperText="Please select your currency"
                ></InputLabel>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
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
        </Grid>
      </Grid>
    </Container>
  );
}
