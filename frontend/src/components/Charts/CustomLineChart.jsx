const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    console.log("Tooltip payload:", payload);
    return (
      <div className="bg-zinc-800 shadow-md rounded-lg p-2 border border-zinc-700 text-white">
        <p className="text-xs font-semibold text-purple-300 mb-1">
          {payload[0].payload.category}
        </p>
        <p className="text-sm text-shadow-white">
          Amount: <span className="text-sm font-medium text-green-400">
            ₹{payload[0].payload.amount}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({data}) => {
  if (!data || data.length === 0) {
    console.warn("🚫 No chart data available. Check if 'prepareExpenseLineChartData' is returning the correct format.");
  } else {
    console.log(`📊 Chart data received. Total entries: ${data.length}`);
  }
  return (
    <div className="bg-zinc-900 p-4 rounded-xl">
      {data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#875cf5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#aaa" }} />
            <YAxis tick={{ fontSize: 12, fill: "#aaa" }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#875cf5"
              fill="url(#incomeGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-sm text-red-400">No data to display</p>
      )}
    </div>
  );
}

export default CustomLineChart