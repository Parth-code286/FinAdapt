import React, { useState, useEffect } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from '../../utils/helper.js';
import CustomBarCharts from '../Charts/CustomBarCharts.jsx';

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="card bg-zinc-900 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-2xl font-semibold text-white">Income Overview</h5>
          <p className="text-sm text-gray-400 mt-1">
            Track your earnings over time and analyze your income trends
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-700 text-white font-medium rounded-md shadow-md hover:from-emerald-600 hover:to-green-800 transition duration-200"
          onClick={onAddIncome}
        >
          <LuPlus className="text-xl" />
          Add Income
        </button>
      </div>
      <div className="mt-6">
        <CustomBarCharts data={chartData} />
      </div>
    </div>
  );
}

export default IncomeOverview