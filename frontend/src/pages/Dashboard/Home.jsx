import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/userUserAuth";
import InfoCard from "../../components/Cards/InfoCard";
import addThousandsSeparator from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import RecentTransactions from "../../components/Dashboard1/RecentTransactions";
import FinanceOverview from "../../components/Dashboard1/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard1/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard1/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard1/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard1/RecentIncome";


const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="text-xl font-semibold text-white"></div>

      <div className="my-5 mx-auto flex flex-col gap-6">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-gradient-to-r from-blue-500 to-cyan-600"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
            color="bg-gradient-to-r from-red-500 to-pink-600"
          />
        </div>

        {/* Full-width Recent Transactions, Finance Overview, and Expense Transactions */}
        <div className="grid md:grid-cols-2 gap-6 auto-rows-max">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions || []}
            onSeeMore={() => navigate("/expense")}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
            <ExpenseTransactions
              transactions={dashboardData?.last30DaysExpenses?.transactions || []}
              onSeeMore={() => navigate("/expense")}
            />
            <RecentIncomeWithChart
              data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
              totalIncome={dashboardData?.totalIncome || 0}
            />
          </div>
          <div className="md:col-span-2">
            <Last30DaysExpenses
              data={dashboardData?.last30DaysExpenses?.transactions || []}
            />
            <RecentIncome
              transactions={dashboardData?.last60DaysIncome?.transactions || []}
              onSeeMore={() => navigate("/income")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
