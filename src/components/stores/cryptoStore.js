import { makeAutoObservable } from "mobx";
import axios from "axios";

class CryptoStore {
  //   allCoins = [];
  allCoins = [
    { name: "BTC" },
    { name: "ETH" },
    { name: "LTC" },
    { name: "USD" }, // Добавляем USD
  ];
  fromCurrency = "BTC";
  toCurrency = "ETH";
  fromAmount = 1;
  toAmount = 0;

  constructor() {
    makeAutoObservable(this);
    this.fetchCoins();
  }

  setFromCurrency(currency) {
    this.fromCurrency = currency;
    this.calculateToAmount();
  }

  setToCurrency(currency) {
    this.toCurrency = currency;
    this.calculateToAmount();
  }

  setFromAmount(amount) {
    this.fromAmount = amount;
    this.calculateToAmount();
  }

  async fetchCoins() {
    try {
      const response = await axios.get(
        "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD"
      );
      this.allCoins = response.data.Data.map((coin) => ({
        name: coin.CoinInfo.Name,
        fullName: coin.CoinInfo.FullName,
        imageUrl: coin.CoinInfo.ImageUrl,
        price: Number(coin.RAW?.USD?.PRICE)?.toFixed(6) || 0,
        volume24Hour: coin.RAW.USD.VOLUME24HOURTO.toFixed(0),
        
      }));
      this.calculateToAmount();
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
    
  }

  calculateToAmount() {
    const fromCoin = this.allCoins.find(
      (coin) => coin.name === this.fromCurrency
    );
    const toCoin = this.allCoins.find((coin) => coin.name === this.toCurrency);
    if (fromCoin && toCoin) {
      this.toAmount = (this.fromAmount * fromCoin.price) / toCoin.price;
    }
  }
}



const cryptoStore = new CryptoStore();
export default cryptoStore;


