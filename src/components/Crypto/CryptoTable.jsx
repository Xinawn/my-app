import React from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function CryptoTable() {
  const [allCoins, setAllCoins] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD"
      )
      .then(({ data }) => {
        const coins = data.Data.map((coin) => {
          const obj = {
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: Number(coin.RAW?.USD?.PRICE)?.toFixed(6) || 0,
            volume24hour: parseInt(coin.RAW?.USD?.VOLUME24HOURTO) || 0,
          };
          return obj;
        });
        setAllCoins(coins);
      })
      .catch((error) => {
        console.error("Error fetching coin data:", error);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-name">
              <TableCell align="left"></TableCell>
              <TableCell align="left">Имя</TableCell>
              <TableCell align="left">Полное Имя</TableCell>
              <TableCell align="left">Стоимость</TableCell>
              <TableCell align="left">Объем (24 часа)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCoins.length > 0 ? (
              allCoins.map((coin) => (
                <TableRow
                  key={coin.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img
                      src={coin.imageUrl}
                      alt="Coin icon"
                      className="currency-icon"
                    />
                  </TableCell>
                  <TableCell align="left">{coin.name}</TableCell>
                  <TableCell align="left">{coin.fullName}</TableCell>
                  <TableCell align="left">$ {coin.price}</TableCell>
                  <TableCell align="left">$ {coin.volume24hour}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>Загрузка...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
