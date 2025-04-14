import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [activeView, setActiveView] = useState('list'); // 'list' or 'chart'
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Other'];

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString()
    };
    setExpenses([...expenses, newExpense]);
    setFormData({
      name: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredExpenses = sortedExpenses.filter(expense => 
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <div className="total-display">
          Total: ${totalExpenses.toFixed(2)}
        </div>
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <form onSubmit={handleAddExpense} className="expense-form">
            <h2>Add New Expense</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Amount ($)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="add-button">
              Add Expense
            </button>
          </form>
        </aside>

        <main className="app-main">
          <div className="controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="view-toggle">
              <button 
                onClick={() => setActiveView('list')} 
                className={activeView === 'list' ? 'active' : ''}
              >
                List View
              </button>
              <button 
                onClick={() => setActiveView('chart')} 
                className={activeView === 'chart' ? 'active' : ''}
              >
                Chart View
              </button>
            </div>
          </div>

          {activeView === 'list' ? (
            <div className="expense-table-container">
              <table className="expense-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')}>
                      Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('amount')}>
                      Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('category')}>
                      Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th onClick={() => handleSort('date')}>
                      Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExpenses.map(expense => (
                    <tr key={expense.id}>
                      <td>{expense.name}</td>
                      <td>${expense.amount.toFixed(2)}</td>
                      <td>{expense.category}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>
                        <button 
                          onClick={() => deleteExpense(expense.id)}
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="chart-view">
              <h2>Spending by Category</h2>
              <div className="chart-container">
                {categories.map(category => {
                  const total = expenses
                    .filter(e => e.category === category)
                    .reduce((sum, e) => sum + e.amount, 0);
                  
                  const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;
                  
                  return (
                    <div key={category} className="chart-item">
                      <div className="chart-label">
                        <span>{category}</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="chart-bar-container">
                        <div 
                          className="chart-bar" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;