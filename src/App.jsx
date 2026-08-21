import React, { useState, useEffect } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [expenses, setExpenses] = useState(() => {
  const savedExpenses = localStorage.getItem("expenses");

  return savedExpenses
    ? JSON.parse(savedExpenses)
    : [
        {
          id: 1,
          amount: 500,
          category: "Food",
          date: "2026-07-15",
          description: "Lunch with team",
        },
        {
          id: 2,
          amount: 1200,
          category: "Travel",
          date: "2026-07-16",
          description: "Petrol",
        },
      ];
});
  const [searchTerm, setSearchTerm] = useState("");

  const [editId, setEditId] = useState(null);

  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert("Please fill in Amount, Category, and Date!");
      return;
    }

    if (editId) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editId
          ? {
            ...expense,
            amount: parseFloat(amount),
            category,
            date,
            description,
          }
          : expense
      );

      setExpenses(updatedExpenses);
      setEditId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        category,
        date,
        description,
      };

      setExpenses([...expenses, newExpense]);
    }

    setAmount("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setDescription(expense.description);
    setEditId(expense.id);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const totalTransactions = expenses.length;

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => e.amount))
      : 0;

      useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);

  const filteredExpenses = expenses.filter((expense) =>
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4"> SMART EXPENSE TRACKER </h3>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Total Expense</h5>
              <h3>₹ {totalExpense}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Total Transactions</h5>
              <h3>{totalTransactions}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h5>Highest Expense</h5>
              <h3>₹ {highestExpense}</h3>
            </div>
          </div>
        </div>

      </div>


      <form onSubmit={handleAddExpense} className="card p-4 shadow-sm mb-4">
        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <input
              type="number"
              placeholder="Enter Amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
       <button type="submit" className="btn btn-primary w-100">
  {editId ? "Update Expense" : "Add Expense"}
</button>
      </form>

      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            placeholder="Search by Category..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>Amount (Rs)</th>
            <th>Category</th>
            <th>Date</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.amount}</td>
                <td><span className="badge bg-secondary">{expense.category}</span></td>
                <td>{expense.date}</td>
                <td>{expense.description || "-"}</td>
                <td>
                  <div className="d-flex gap-2">

  <button
    onClick={() => handleEdit(expense)}
    className="btn btn-warning btn-sm"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(expense.id)}
    className="btn btn-danger btn-sm"
  >
    Delete
  </button>

</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-3">
                No expenses found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;