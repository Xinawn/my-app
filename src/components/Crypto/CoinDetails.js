// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import moment from "moment";
// import Chart from "chart.js/auto";
// import "chart.js/auto/auto";
// import { adapters } from "chart.js/auto";

// const CoinDetails = ({ selectedCoin }) => {
//   const [historicalData, setHistoricalData] = useState([]);
//   const [showChart, setShowChart] = useState(false);

//   useEffect(() => {
//     const fetchHistoricalData = async () => {
//       if (selectedCoin) {
//         try {
//           const response = await axios.get(
//             `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${selectedCoin.name}&tsym=USD&limit=30`
//           );
//           const data = response.data.Data.Data;
//           const formattedData = data.map((entry) => ({
//             x: moment.unix(entry.time).toDate(),
//             y: entry.close,
//           }));
//           setHistoricalData(formattedData);
//           setShowChart(true);
//         } catch (error) {
//           console.error("Ошибка получения исторических данных:", error);
//         }
//       }
//     };

//     fetchHistoricalData();
//   }, [selectedCoin]);

//   // Регистрируем адаптер даты для chart.js
//   adapters.date.override({
//     _id: "moment",
//     _create: function (time) {
//       return moment(time);
//     },
//   });

//   return (
//     <div>
//       {showChart && historicalData.length > 0 && (
//         <Line
//           data={{
//             datasets: [
//               {
//                 label: `Цена ${selectedCoin.name}`,
//                 data: historicalData,
//                 backgroundColor: "rgba(75,192,192,0.4)",
//                 borderColor: "rgba(75,192,192,1)",
//                 borderWidth: 1,
//               },
//             ],
//           }}
//           options={{
//             scales: {
//               x: {
//                 type: "time",
//                 adapters: {
//                   date: "moment",
//                 },
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default CoinDetails;