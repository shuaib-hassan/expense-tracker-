
function DateInput({ label, name, value, onChange }) {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <input
          type="date"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default DateInput;
  