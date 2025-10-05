import React from "react";
import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  console.log("ExpenseTransactions data:", transactions);
  return (
    <div className="bg-[#1e1e2f] p-6 rounded-xl border border-[#2a2a3b] shadow-md w-full">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Expenses</h5>
        <button className="flex items-center gap-1 text-sm text-[#8b5cf6] hover:text-[#a78bfa] transition duration-200" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {Array.isArray(transactions) && transactions.length > 0 ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 italic">No recent expense transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;