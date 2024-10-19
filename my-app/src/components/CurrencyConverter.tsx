"use client";
import { useState } from "react";

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");

  const handleConvert = () => {
    console.log(`converting ${amount} from ${fromCurrency} to ${toCurrency}`);
  };
  return (
    <div>
      <h2>Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
      </select>
      <button onClick={handleConvert}>Convert</button>

    </div>
  );
};
export default CurrencyConverter;
