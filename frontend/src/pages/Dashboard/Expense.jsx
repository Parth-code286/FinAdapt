import React, { useEffect, useState } from 'react'
import useUserAuth from '../../hooks/userUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import toast from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import ExpenseOverview from '../../components/Expenses/ExpenseOverview'
import Modals from '../../components/layouts/Modals'
import AddExpenseForm from '../../components/Expenses/AddExpenseForm'
import ExpenseList from '../../components/Expenses/ExpenseList.jsx'
import DeleteAlert from '../../components/layouts/DeleteAlert.jsx'


export const Expense = () => {
  useUserAuth()
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(true);
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
      const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        console.log("✅ Fetched Expense Data:", response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log(`Something went wrong : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const addExpenseDetails = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      if (response.data) {
        toast.success("Expense added successfully!");
        fetchExpenseDetails();
        setOpenAddExpenseModal(false);
      }
    } catch (error) {
      toast.error("Failed to add Expense. Please try again.");
      console.error("Add Expense error:", error?.response?.data || error.message || error);
    }
  };
  const deleteExpenseDetails = async () => {
    if (!openDeleteAlert.data) return;
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(openDeleteAlert.data));
      toast.success("Expense deleted successfully!");
      fetchExpenseDetails();
      setOpenDeleteAlert({ show: false, data: null });
    } catch (error) {
      toast.error("Failed to delete Expense.");
      console.error("Delete Expense error:", error?.response?.data || error.message);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

   useEffect(() => {
      fetchExpenseDetails(); // auto-fetch data when page loads
    }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id });
          }}
          onDownload={handleDownloadExpenseDetails}
        />
        <Modals
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={addExpenseDetails} />
        </Modals>
        <Modals
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={deleteExpenseDetails}
          />
        </Modals>
      </div>
    </DashboardLayout>
  )
}
