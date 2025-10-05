import React, { useState } from "react";
import Input from "../inputs/Input";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: ""
  });

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
    setExpense({
      category: "",
      amount: "",
      date: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category"
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
      />
      <Input
        label="Amount"
        type="number"
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
      />
      <Input
        label="Date"
        type="date"
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Expense
      </button>
    </form>
  );
};

export default AddExpenseForm;