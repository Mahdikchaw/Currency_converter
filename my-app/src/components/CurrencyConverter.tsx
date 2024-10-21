"use client";
import { useState } from "react";
import "./CurrencyConverter.css";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { currencies } from "./currencies";

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleNumberClick = (number: string) => {
    setAmount((prevAmount) => prevAmount + number); // Concatenate the clicked number to the existing amount
  };
  const handleDeleteNumber = (number: string) => {
    setAmount((prevAmount) => prevAmount.slice(0, -1)); // Concatenate the clicked number to the existing amount
  };
  const fetchConversionRate = async (
    fromCurrency: string,
    toCurrency: string
  ) => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();
    return data.rates[toCurrency];
  };

  const handleConvert = async () => {
    if (amount === "") return;
    const rate = await fetchConversionRate(fromCurrency, toCurrency);
    const result = Number(amount) * rate;
    setConvertedAmount(result);
    setMessage(` = ${result} ${toCurrency}`);
  };

  const getFlagUrl = (currency: string) => {
    const countryCode = currency.slice(0, 2).toLowerCase(); // Take the first two letters of the currency as country code
    return `https://www.countryflags.io/${countryCode}/flat/64.png`; // Example from CountryFlags API
  };

  return (
    <div className="conversion-container">
      <div className="valueInput">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          style={{
            border: "2px solid blue",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
            width: "300px",
          }}
        />
        <div className="trash">
          <RiDeleteBin6Line
            onClick={() => {
              setAmount("");
              setConvertedAmount(null);
              setMessage("");
            }}
            style={{
              width: "30px",
              height: "40px",
            }}
          />
        </div>
      </div>
      <div className="dropdownCurrency">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option
              key={currency.code}
              value={currency.code}
              title={currency.name}
            >
              {currency.code} : {currency.name}
            </option>
          ))}
        </select>

        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option
              key={currency.code}
              value={currency.code}
              title={currency.name}
            >
              {currency.code} : {currency.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleConvert} className="convertButton">
        Convert
      </button>
      {message && <p>{message}</p>}

      <div className="numberContainer">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ".", "delete"].map((num) => (
          <div
            key={num}
            onClick={() => {
              if (num === ".") {
                handleNumberClick(num); // Handle decimal point
              } else if (num === "delete") {
                handleDeleteNumber(num); // Handle delete (no need to pass num)
              } else {
                handleNumberClick(num.toString()); // Handle all other numbers
              }
            }}
            className="numberButton"
          >
            {num === "delete" ? <FaDeleteLeft /> : num}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CurrencyConverter;
