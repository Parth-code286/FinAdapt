import moment from 'moment';
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    const word = parts[0];
    return (word[0] + word[word.length - 1]).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};
export default addThousandsSeparator;

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category || "Unknown",
    amount: item?.amount || 0,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  const chartData = sortedData.map(item => ({
    category: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};
export const prepareExpenseLineChartData = (data = []) => {
  console.log("📥 Raw input length:", data.length);

  const sortedData = [...data]
    .filter(item => item?.date && !isNaN(Number(item.amount)))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item.date).format('MMM YYYY'),
    amount: Number(item.amount),
    category: item.category || "Misc",
  }));

  console.log("📊 Chart data count:", chartData.length);
  return chartData;
};