// // store.js
// import { makeAutoObservable, observable, action, computed } from "mobx";
// import axios from "axios";

// class CurrencyConverterStore {
//   rates = {}; // Объект для хранения курсов валют
//   fromCurrency = "BTC"; // Исходная валюта по умолчанию
//   toCurrency = "USDC"; // Валюта для конвертации по умолчанию
//   _fromAmount = 1; // Приватное поле для хранения исходной суммы
//   _toAmount = 0; // Приватное поле для хранения конвертированной суммы

//   constructor() {
//     // Создаем наблюдаемые и вычисляемые свойства
//     makeAutoObservable(this, {
//       _fromAmount: observable, // Исходная сумма как наблюдаемое свойство
//       fromAmount: computed, // Исходная сумма как вычисляемое свойство (геттер/сеттер)
//       _toAmount: observable, // Конвертированная сумма как наблюдаемое свойство
//       toAmount: computed, // Конвертированная сумма как вычисляемое свойство (геттер/сеттер)
//       setFromAmount: action.bound, // Метод для установки исходной суммы как действие
//       setToAmount: action.bound, // Метод для установки конвертированной суммы как действие
//     });
//     this.fetchRates(); // Получаем курсы валют при создании хранилища
//   }

//   // Геттер и сеттер для исходной суммы
//   get fromAmount() {
//     return this._fromAmount;
//   }

//   set fromAmount(value) {
//     this._fromAmount = value;
//   }

//   // Геттер и сеттер для конвертированной суммы
//   get toAmount() {
//     return this._toAmount;
//   }

//   set toAmount(value) {
//     this._toAmount = value;
//   }

//   fetchRates = async () => {
//     try {
//       // Получение данных о курсах валют из API
//       const response = await axios.get(
//         "https://min-api.cryptocompare.com/data/top/totaltoptiervolfull?limit=10&tsym=USD"
//       );
//       const data = response.data.Data;
//       const rates = data.reduce((acc, coin) => {
//         acc[coin.CoinInfo.Name] = Number(coin.RAW?.USD?.PRICE)?.toFixed(5) || 0;
//         return acc;
//       }, {});
//       this.rates = rates; // Сохранение курсов валют в объекте rates
//     } catch (error) {
//       console.error("Error fetching rates:", error);
//     }
//   };

//   setFromCurrency(currency) {
//     this.fromCurrency = currency; // Устанавливаем исходную валюту
//   }

//   setToCurrency(currency) {
//     this.toCurrency = currency; // Устанавливаем валюту для конвертации
//   }

//   setFromAmount(amount) {
//     this.fromAmount = amount; // Устанавливаем исходную сумму через сеттер
//   }

//   setToAmount(amount) {
//     this.toAmount = amount; // Устанавливаем конвертированную сумму через сеттер
//   }

//   // Вычисляем конвертированную сумму на основе исходной суммы и курсов валют
//   get convertedAmount() {
//     const fromRate = this.rates[this.fromCurrency];
//     const toRate = this.rates[this.toCurrency];
//     return this.fromAmount * (fromRate / toRate);
//   }

//   // Вычисляем исходную сумму на основе конвертированной суммы и курсов валют
//   get reverseConvertedAmount() {
//     const fromRate = this.rates[this.fromCurrency];
//     const toRate = this.rates[this.toCurrency];
//     return this.toAmount * (toRate / fromRate);
//   }
// }

// const currencyConverterStore = new CurrencyConverterStore();

// export default currencyConverterStore;