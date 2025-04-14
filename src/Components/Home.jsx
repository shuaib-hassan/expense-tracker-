
import ExpenseTable from "./ExpenseTable";

function Home({ expenses, onDeleteExpense }) {
  return (
    <div className="home">
      <h2>All Expenses</h2>
      <ExpenseTable
      expenses={expenses}
      onDeleteExpense={onDeleteExpense}
      />
    </div>
  );
}

export default Home;
