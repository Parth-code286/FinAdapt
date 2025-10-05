import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const aggregateData = (rawData) => {
  const grouped = {};

  rawData.forEach(({ category, amount }) => {
    if (grouped[category]) {
      grouped[category] += amount;
    } else {
      grouped[category] = amount;
    }
  });

  return Object.entries(grouped).map(([category, amount]) => ({
    category,
    amount,
  }));
};

const CustomBarCharts = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-indigo-600 shadow-xl rounded-md p-2 border border-indigo-300">
          <p className="text-xs font-semibold text-white mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-white">
            Amount:{" "}
            <span className="text-sm font-semibold text-yellow-300">
              ₹{payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-800 mt-6 p-4 rounded-xl shadow-md">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={aggregateData(data)}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#ccc" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#ccc" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  hoveredIndex === index
                    ? "#bca7f5" // softer violet for hover
                    : getBarColor(index)
                }
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarCharts;