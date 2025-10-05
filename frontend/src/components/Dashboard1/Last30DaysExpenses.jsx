import React, { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarCharts from '../Charts/CustomBarCharts';

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return ()=>{};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold text-white">Last 30 Days Expenses</h5>
      </div>
      <CustomBarCharts data={chartData}/>
    </div>
  );
};

export default Last30DaysExpenses;