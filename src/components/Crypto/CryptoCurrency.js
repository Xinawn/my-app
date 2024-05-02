import * as React from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import "./CryptoCurrency.css";
// import Select from "@mui/material/Select";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

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

// interface TCoin {
//   name: String;
//   fullName: String;
//   imageUrl: String;
//   volume24hour: Number;
//   price: Number;
// }

export default function CryptoCurrency() {
  const [allCoins, setAllCoins] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD"
      )
      .then(({ data }) => {
        const coins = data.Data.map((coin) => {
          const obj = {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: Number(coin.RAW?.USD?.PRICE)?.toFixed(4) || 0,
            volume24hour: parseInt(coin.RAW?.USD?.VOLUME24HOUR) || 0
          };
          return obj;
        });
        setAllCoins(coins);
      })
      .catch((error) => {
        console.error('Error fetching coin data:', error);
      });
  }, []);

  return (
    <Container maxWidth="lg" className="crypto-container">
      <Grid container spacing={3}>
        <Grid xs={7}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="table-name">
                  <TableCell align="left">imageUrl</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">FullName</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">volume24hour</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCoins.map((coin) => (
                  <TableRow
                    key={coin.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <img src={coin.imageUrl} alt="Coin icon" className="currency-icon"/>
                    </TableCell>
                    <TableCell align="left">{coin.name}</TableCell>
                    <TableCell align="left">{coin.fullName}</TableCell>
                    <TableCell align="left">$ {coin.price}</TableCell>
                    <TableCell align="left">{coin.volume24hour}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid xs={5}>
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
                  helperText="Выберите вашу валюту"
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
                  helperText="Выберите вашу валюту"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </div>
            <Typography className="result" variant="h4">
              3,27 Белорусский рубль
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
