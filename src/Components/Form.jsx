import { useState } from "react";
import TextInput from "./TextInput.jsx";
import AmountInput from "./AmountInput.jsx";
import DateInput from "./DateInput.jsx";

function Form({ onAddExpense }) {
  const [formData, setFormData] = useState({ //I've set the initial state of the form to empty
    name: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
    // This function handles the form submission
  function handleSubmit(event) {
    event.preventDefault();
    // I'm ensuring that the name and amount are filled
    if (!formData.name || !formData.amount) return;

    const newExpense = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount).toFixed(2),
      date: formData.date,
    };

    onAddExpense(newExpense);
    setFormData({ name: "", description: "", category: "", amount: "", date: "" });
  }

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      <p>Enter your expense details below:</p>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Expense Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter expense name"
          required
        />
        
        <TextInput
          label="Expense Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter expense description"
        />

        <TextInput
          label="Expense Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter expense category"
        />

        <AmountInput
          label="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
        />

        <DateInput
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <div className="form-field">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
