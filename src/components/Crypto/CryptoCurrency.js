import React from "react";
import "./CryptoCurrency.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

export default function CrypoCyrrency() {
  return (
    <Container maxWidth="lg">
      <div className="crypto-table">
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
      </div>
      <Grid className="crypto-table" container spacing={2}>
        <Grid xs={8}>
          <Paper className="crypto-currency-paper">xs=8</Paper>
        </Grid>
        <Grid xs={4}>
          <Paper className="crypto-currency-paper">xs=4</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
