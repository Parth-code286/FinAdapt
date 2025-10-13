import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaWallet, FaArrowUp, FaArrowDown, FaChartLine } from 'react-icons/fa';

export default function Dashboard() {
  const { state } = useData();
  const navigate = useNavigate();

  // Calculate metrics
  const metrics = useMemo(() => {
    const income = state.transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = state.transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBudget = state.budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = state.budgets.reduce((sum, b) => sum + b.spent, 0);

    return {
      balance: income - expenses,
      monthlySpending: expenses,
      budgetLeft: totalBudget - totalSpent,
      budgetPercentage: totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0,
    };
  }, [state.transactions, state.budgets]);

  // Chart data
  const spendingTrends = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => ({
      month,
      spending: Math.round(1000 + Math.random() * 500 + i * 100),
      income: Math.round(3000 + Math.random() * 1000),
    }));
  }, []);

  const categoryData = useMemo(() => {
    return state.budgets.map((budget) => ({
      name: budget.category,
      value: budget.spent,
    }));
  }, [state.budgets]);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const budgetProgress = useMemo(() => {
    const totalBudget = 500; // Assuming total budget for demo
    const spent = 175;
    const remaining = 325;
    return [
      { x: 0, spent: 0, remaining: totalBudget },
      { x: 0.25, spent: spent * 0.25, remaining: totalBudget - spent * 0.25 },
      { x: 0.5, spent: spent * 0.5, remaining: totalBudget - spent * 0.5 },
      { x: 0.75, spent: spent * 0.75, remaining: totalBudget - spent * 0.75 },
      { x: 1, spent: spent, remaining: remaining },
    ];
  }, []);

  const recentTransactions = useMemo(() => {
    return state.transactions.slice(-5).reverse();
  }, [state.transactions]);

  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Total Balance</h3>
            <FaWallet className="text-primary text-xl" />
          </div>
          <p className="text-3xl font-bold text-foreground">${metrics.balance.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Monthly Spending</h3>
            <FaArrowDown className="text-destructive text-xl" />
          </div>
          <p className="text-3xl font-bold text-foreground">${metrics.monthlySpending.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">-5% from last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">Budget Left</h3>
            <FaChartLine className="text-success text-xl" />
          </div>
          <p className="text-3xl font-bold text-foreground">${metrics.budgetLeft.toLocaleString()}</p>
          <div className="mt-2 bg-secondary rounded-full h-2">
            <div
              className="bg-success rounded-full h-2 transition-all"
              style={{ width: `${100 - metrics.budgetPercentage}%` }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-muted-foreground">AI Insights</h3>
            <FaArrowUp className="text-primary text-xl" />
          </div>
          <p className="text-3xl font-bold text-foreground">{state.insights.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Active recommendations</p>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Spending Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={spendingTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line type="monotone" dataKey="spending" stroke="hsl(var(--chart-1))" strokeWidth={2} />
              <Line type="monotone" dataKey="income" stroke="hsl(var(--chart-2))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={90}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                minAngle={5}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Budget Progress & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Budget Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={budgetProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                type="number"
                domain={[0, 1]}
                ticks={[0, 0.25, 0.5, 0.75, 1]}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(var(--shadow))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value, name) => [`$${value}`, name === 'spent' ? 'Spent: $175' : 'Remaining: $325']}
              />
              <Line
                type="monotone"
                dataKey="spent"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--chart-1))', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="remaining"
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <button
              onClick={() => navigate('/transactions')}
              className="text-sm text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{transaction.title}</p>
                  <p className="text-xs text-muted-foreground">{transaction.category}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      transaction.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
