import React from 'react'

function TextInput({ label, name, value, onChange, placeholder, required = false }) {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  }
  
  export default TextInput;
  