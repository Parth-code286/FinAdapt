import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useData } from '@/contexts/DataContext';
import { FaUser, FaEnvelope, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ToastContainer, ToastMessage } from '@/components/Toast';

export default function Profile() {
  const { state, dispatch } = useData();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [formData, setFormData] = useState({
    fullName: state.profile.fullName,
    email: state.profile.email,
    currency: state.profile.currency,
  });

  useEffect(() => {
    setFormData({
      fullName: state.profile.fullName,
      email: state.profile.email,
      currency: state.profile.currency,
    });
  }, [state.profile]);

  const addToast = (message: string, type: ToastMessage['type']) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFieldBlur = (field: keyof typeof formData) => {
    if (formData[field] !== state.profile[field]) {
      dispatch({ type: 'UPDATE_PROFILE', payload: { [field]: formData[field] } });
      addToast('Profile updated successfully', 'success');
    }
  };

  const activityData = useMemo(() => {
    const monthCounts = Array(6).fill(0);
    state.transactions.forEach((t) => {
      const month = new Date(t.date).getMonth();
      if (month >= 0 && month < 6) {
        monthCounts[month]++;
      }
    });
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, i) => ({
      month,
      transactions: monthCounts[i] || Math.floor(Math.random() * 10) + 5,
    }));
  }, [state.transactions]);

  const stats = useMemo(() => {
    const totalTransactions = state.transactions.length;
    const totalBudgets = state.budgets.length;
    const totalAccounts = state.linkedAccounts.length;
    return { totalTransactions, totalBudgets, totalAccounts };
  }, [state.transactions, state.budgets, state.linkedAccounts]);

  return (
    <div className="p-6 space-y-6">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Profile Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">Personal Information</h3>

          <div className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <FaUser className="text-3xl text-primary" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground">{formData.fullName}</h4>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  onBlur={() => handleFieldBlur('fullName')}
                  className="w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleFieldBlur('email')}
                  className="w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                  <FaDollarSign /> Preferred Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => {
                    setFormData({ ...formData, currency: e.target.value });
                    dispatch({ type: 'UPDATE_PROFILE', payload: { currency: e.target.value } });
                    addToast('Currency updated successfully', 'success');
                  }}
                  className="w-full px-4 py-3 bg-secondary border border-input rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:outline-none transition-all"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold text-primary">{stats.totalTransactions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Budgets</p>
                <p className="text-2xl font-bold text-success">{stats.totalBudgets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Linked Accounts</p>
                <p className="text-2xl font-bold text-warning">{stats.totalAccounts}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Member Since</h3>
            <p className="text-sm text-muted-foreground">January 2025</p>
          </div>
        </motion.div>
      </div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <FaChartLine className="text-primary" /> Activity Overview
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
            />
            <Line
              type="monotone"
              dataKey="transactions"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates about your account</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Budget Alerts</p>
              <p className="text-xs text-muted-foreground">Get notified when approaching limits</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Auto-Sync Accounts</p>
              <p className="text-xs text-muted-foreground">Automatically sync linked accounts daily</p>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 bg-muted rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-6"></div>
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
