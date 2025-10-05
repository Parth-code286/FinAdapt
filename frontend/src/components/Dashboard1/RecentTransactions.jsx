import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";


const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-[#1e1e2f] p-6 rounded-xl border border-[#2a2a3b] shadow-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-white">Recent Transactions</h5>
        <button
          className="flex items-center gap-1 text-sm text-[#8b5cf6] hover:text-[#a78bfa] transition duration-200"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
