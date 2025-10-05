import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

// Ensure prepareExpenseLineChartData is defined or imported appropriately
// For now, we'll assume it's imported from a utility file:
// import { prepareExpenseLineChartData } from '../../utils/chartUtils';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("📦 Transactions in ExpenseOverview:", transactions);
    const result = prepareExpenseLineChartData(transactions);
    console.log("📊 Chart Data Generated:", result);
    setChartData(result);
    return () => {};
  }, [transactions]);

  console.log("📈 Data passed to CustomLineChart:", chartData);

  return (
    <div className="card p-4 rounded bg-zinc-800 text-white shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where your money goes.
          </p>
        </div>
        <button
          onClick={onExpenseIncome}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
        >
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <div className="">
        {/* Chart or expense overview content can go here */}
      </div>
      <div className="mt-10">
<CustomLineChart data={chartData} />
</div>
    </div>
  );
};

export default ExpenseOverview;