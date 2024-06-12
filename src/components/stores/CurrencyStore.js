import { makeAutoObservable } from "mobx";
import axios from "axios";
import dayjs from "dayjs";

class CurrencyStore {
  currencyData = [];
  conversionValues = {};
  defaultCurrencies = ["USD", "EUR", "RUB", "BYN", "PLN", "CNY"];
  selectedCurrencies = [...this.defaultCurrencies];
  selectedDate = dayjs(); // dayjs для даты
  currencyDynamics = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchCurrencyData = async (date = dayjs()) => {
    try {
      const formattedDate = date.toISOString().split("T")[0]; // формат YYYY-MM-DD
      const response = await axios.get(
        `https://api.nbrb.by/exrates/rates?ondate=${formattedDate}&periodicity=0`
      );
      const currencies = response.data.map((currency) => ({
        name: currency.Cur_Name,
        abbreviation: currency.Cur_Abbreviation,
        scale: currency.Cur_Scale,
        price: currency.Cur_OfficialRate,
        id: currency.Cur_ID,
      }));

      // Добавление BYN вручную в массив валют
      currencies.push({
        name: "Белорусский рубль",
        abbreviation: "BYN",
        scale: 1,
        price: 1,
        id: "BYN",
      });

      this.setCurrencyData(currencies);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  setCurrencyData = (data) => {
    this.currencyData = data;
    this.conversionValues = data.reduce((acc, currency) => {
      acc[currency.abbreviation] = "";
      return acc;
    }, {});
  };

  setSelectedDate = (date) => {
    this.selectedDate = dayjs(date);
    this.fetchCurrencyData(date);
  };

  fetchCurrencyDynamics = async (curId, startDate, endDate) => {
    try {
      const formattedStartDate = startDate.format("YYYY-MM-DD");
      const formattedEndDate = endDate.format("YYYY-MM-DD");
      const response = await axios.get(
        `https://api.nbrb.by/exrates/rates/dynamics/${curId}?startdate=${formattedStartDate}&enddate=${formattedEndDate}`
      );
      this.currencyDynamics = response.data;
    } catch (error) {
      console.error("Error fetching currency dynamics:", error);
    }
  };

  handleChange = (abbreviation, value) => {
    if (value < 0) return; // Отклонение отрицательных значений

    const fromCurrency = this.currencyData.find(
      (currency) => currency.abbreviation === abbreviation
    );

    const newValues = this.currencyData.reduce((acc, currency) => {
      if (currency.abbreviation === abbreviation) {
        acc[currency.abbreviation] = value;
      } else {
        const convertedValue =
          (value * fromCurrency.price) /
          fromCurrency.scale /
          (currency.price / currency.scale);
        acc[currency.abbreviation] = convertedValue.toFixed(4);
      }
      return acc;
    }, {});

    this.conversionValues = newValues;
  };

  addCurrency = (abbreviation) => {
    if (!this.selectedCurrencies.includes(abbreviation)) {
      this.selectedCurrencies.push(abbreviation);
    }
  };

  removeCurrency = (abbreviation) => {
    if (!this.defaultCurrencies.includes(abbreviation)) {
      this.selectedCurrencies = this.selectedCurrencies.filter(
        (currency) => currency !== abbreviation
      );
    }
  };
}

const currencyStore = new CurrencyStore();
export default currencyStore;
