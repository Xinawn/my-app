import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import "./CryptoCurrency.css";

import CryptoTable from "./CryptoTable";
import ConventerBlock from "./ConventerBlock";

export default function CryptoCurrency() {
  return (
    <Container maxWidth="lg" className="crypto-container">
      <Grid container spacing={3}>
        <Grid xs={8}>
          <CryptoTable />
        </Grid>
        <Grid xs={4}>
          <ConventerBlock />
        </Grid>
      </Grid>
    </Container>
  );
}
