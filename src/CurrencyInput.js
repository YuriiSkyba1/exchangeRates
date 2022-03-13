import React from 'react'

export default function CurrencyInput(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeQuantity,
    quantity
  } = props
  return (
    <div>
      <input type="number" className="input" value={quantity} onChange={onChangeQuantity} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}