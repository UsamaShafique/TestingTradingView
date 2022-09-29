import "./App.css";
import { useEffect, useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";



function App() {
  const [value, setValue] = useState("BTCUSDT");
  const [exchange, setExchange] = useState("Binance");
  const [pairs, setPairs] = useState([]);


  const exchanges = [
    {
      label: "Binance"
    },
    {
      label: "FTX"
    }
  ]
  const options = ['BTCUSDT', 'DOTUSDT', 'LTC/BTC'];


  useEffect(() => {
    getExchangeData('Binance');
  }, []);

  var pairsArray = [];

  const getExchangeData = async (e) => {
    let response;
    switch (e) {
      case 'Binance':
        response = await fetch(
          "https://api.binance.com/api/v3/exchangeInfo"
        ).then((response) => response.json());
        for (let j = 0; j < response.symbols.length; j++) {
          pairsArray.push(
            response.symbols[j].symbol
          );
        }
        setPairs(pairsArray);
        break;
      case 'FTX':
        setPairs(options);
        break;
      default:
        setPairs([]);
        break;
    }
  };


  return (
    <body>
      <select id="exchange" onChange={(e) => { setExchange(e.target.value); getExchangeData(e.target.value) }}>
        {exchanges.map((exchange) => (
          <option value={exchange.label}>{exchange.label}</option>
        ))}
      </select>
      <select id="pairs" onChange={(e) => setValue(e.target.value)}>
        {pairs.map((option, i) => (
          <option key={i} value={option}>{option}</option>
        ))}
      </select>
      <br />
      <div class="tradingview-widget-container" id="tradingbot-chart">
        {/* <div className="App"> */}
        <TradingViewWidget
          width={`1300px`}
          height={`850px`}
          symbol={`${exchange}:${value}`}
          theme={Themes.DARK}
          locale="en"
          // hide_top_toolbar = {false}
          // timezone="America/New York"
          hideSideToolbar={true}
          details
          news={["headlines"]}
          hide_side_toolbar={false}
        />

        <br />
        <br />
      </div>
    </body>
  );
}

export default App;
