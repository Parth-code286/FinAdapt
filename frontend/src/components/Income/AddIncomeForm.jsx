import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Input from '../inputs/Input';

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Income Source</label>
        <Input
          type="text"
          value={income.source}
          onChange={(e) => handleChange("source", e.target.value)}
          placeholder="Freelance, Salary, etc."
          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Amount</label>
        <Input
          type="number"
          value={income.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="Enter amount"
          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Date</label>
        <Input
          type="date"
          value={income.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className="w-full px-3 py-2 bg-zinc-800 text-white border border-zinc-700 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
        />
      </div>
      <div className="pt-4">
        <button
          onClick={() => {
            if (!income.source.trim()) return toast.error("Source is required.");
            if (
              !income.amount ||
              isNaN(income.amount) ||
              Number(income.amount) <= 0
            )
              return toast.error("Amount should be a valid number greater than 0.");
            if (!income.date) return toast.error("Date is required.");
            onAddIncome(income);
          }}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;