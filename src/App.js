import "./App.css";
import { useState } from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

function App() {
  const [value, setValue] = useState("BTCUSDT");
  const [exchange, setExchange] = useState("Binance");

  const exchanges = [
    {
      label: "Binance"
    },
    {
      label: "FTX"
    }
  ]
  const options = [
    {
      label: "BTCUSDT",
      value: "BTCUSDT",
    },
    {
      label: "DOTUSDT",
      value: "DOTUSDT",
    },
    {
      label: 'LTCBTC',
      value: 'LTC/BTC'
    }
  ];

  return (
    <body>
      <select id="exchange" onChange={(e) => setExchange(e.target.value)}>
      {exchanges.map((exchange)=>(
        <option value={exchange.label}>{exchange.label}</option>
      ))}
      </select>
      <select id="pairs" onChange={(e) => setValue(e.target.value)}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
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
          // timezone="America/New York"
          hideSideToolbar={true}
          details
          news={["headlines"]}
          hide_side_toolbar={false}
        />
      </div>
    </body>
  );
}

export default App;
