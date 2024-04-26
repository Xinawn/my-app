import React from "react";
import "./CryptoCurrency.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';


export default function CrypoCyrrency() {
  return (
    <Container maxWidth="lg">
      {/* <div className="crypto-table">
        <h2>Текущие курсы Криптовалют</h2>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс НБРБ</th>
              <th>Изменения</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div> */}
      <Grid className="crypto-table" container spacing={2}>
        <Grid xs={8}>
          <Paper className="crypto-currency-paper">xs=8</Paper>
        </Grid>
        <Grid xs={4}>
          <Paper className="crypto-currency-input">
            <div>
            <TextField
              error
              id="outlined-error"
              label="Error"
              defaultValue="Hello World"
            />
                    <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={10}
          // onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
