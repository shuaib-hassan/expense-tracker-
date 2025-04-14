import React from 'react'

function AmountInput({ label, name, value, onChange, placeholder, required = false }) {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }
  
  export default AmountInput;
  