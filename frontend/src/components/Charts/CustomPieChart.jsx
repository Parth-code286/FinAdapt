import React from 'react'
import{
PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
Legend,
}from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#333',
        border: '1px solid #555',
        borderRadius: '8px',
        padding: '10px 14px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 600,
        boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
      }}>
        <p>{payload[0].name}</p>
        <p>₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }

  return null;
};

const CustomPieChart = ({data,label,totalAmount,colors,showTextAnchor}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          paddingAngle={2}
          minAngle={10}
          stroke="#1f1f1f"
          strokeWidth={2}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={<CustomTooltip />}
          formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
        />
        <Legend
          iconType="circle"
          wrapperStyle={{
            color: '#fff',
            fontSize: '13px',
            paddingTop: '10px',
            textAlign: 'center',
          }}
        />
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-18}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#aaa"
              fontSize="13px"
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={12}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#fff"
              fontSize="20px"
              fontWeight="bold"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CustomPieChart