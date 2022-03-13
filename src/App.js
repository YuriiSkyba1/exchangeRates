import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyInput from './CurrencyInput'

const BASE_URL = 'https://api.exchangerate.host/latest?base=USD'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [quantity, setQuantity] = useState(1)
  const [quantityInFromCurrency, setQuantityInFromCurrency] = useState(true)

  let toQuantity, fromQuantity
  if (quantityInFromCurrency) {
    fromQuantity = quantity
    toQuantity = quantity * exchangeRate
  } else {
    toQuantity = quantity
    fromQuantity = quantity / exchangeRate
  }


  // ERROR HANDLING FUNCTION FOR `fetch()` CALLS
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  useEffect(() => {
    fetch(`${BASE_URL}&symbols=${'EUR,NOK,SEK,DKK'}`)
    .then(handleErrors)
      .then(res => res.json())
      .then( data => {
         const firstCurrency = Object.keys(data.rates)[0]
         setCurrencyOptions([data.base, ...Object.keys(data.rates)])
         setFromCurrency(data.base)
         setToCurrency(firstCurrency)
         setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  
  }, [fromCurrency, toCurrency])

  function handleFromquantityChange(e) {
    setQuantity(e.target.value)
    setQuantityInFromCurrency(true)
  }

  function handleToquantityChange(e) {
    setQuantity(e.target.value)
    setQuantityInFromCurrency(false)
  }

  return (
    <>
      <h1>Currency Convertor</h1>
      <div className="currency__block">
      <CurrencyInput
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangequantity={handleFromquantityChange}
        quantity={fromQuantity}
      />
      <div className="equals">=</div>
      <CurrencyInput
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangequantity={handleToquantityChange}
        quantity={toQuantity}
      />
      </div>
    </>
  );
}

export default App;