


import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import useApi from "../hooks/useApi";
import ExpenseChart from "../components/ExpenseChart";
import useAppStore from "../store/appStore"; // Use the new app store

const Dashboard = () => {
  
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = useApi();
  // const { activeView } = useAppStore();
  const { activeView, setActiveView } = useAppStore();


const fetchExpenses = async () => {
  try {
    setLoading(true);
    const res = await api.get("/expenses");
    console.log("API Raw Data:", res.data);

    // Since it's already an array, we can directly set it
    if (Array.isArray(res.data)) {
      setExpenses(res.data);
    } else {
      console.error("Unexpected API format:", res.data);
      setExpenses([]);
    }
  } catch (error) {
    console.error("Failed to fetch expenses", error);
    setExpenses([]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/expenses/${currentExpenseId}`, formData);
        setIsEditing(false);
        setCurrentExpenseId(null);
      } else {
        await api.post("/expenses", formData);
      }
      setFormData({ description: "", amount: "", category: "Food", date: "" });
      fetchExpenses();
    } catch (error) {
      console.error("Failed to submit expense", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  const handleEditClick = (expense) => {
    setIsEditing(true);
    setCurrentExpenseId(expense._id);
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
        ? new Date(expense.date).toISOString().split("T")[0]
        : "",
    });
    setActiveView("add-expense");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Expense Dashboard
        </h1>

        {(activeView === "dashboard" || activeView === "add-expense") && (
          // Expense Form Card
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              {isEditing ? "Edit Expense" : "Add New Expense"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Form inputs... */}
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                    <option>Health</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm font-medium mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
              >
                {isEditing ? "Update Expense" : "Add Expense"}
              </button>
            </form>
          </div>
        )}

        {(activeView === "dashboard" ||
          activeView === "expense-breakdown" ||
          activeView === "recent-transactions") && (
          // Charts and Overview Section
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {(activeView === "dashboard" ||
              activeView === "expense-breakdown") && (
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">
                  Expense Breakdown By Graph
                </h2>
                {loading ? (
                  <p>Loading charts...</p>
                ) : (
                  <ExpenseChart expenses={expenses} />
                )}
              </div>
            )}
            {(activeView === "dashboard" ||
              activeView === "recent-transactions") && (
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-700">
                  Recent Transactions
                </h2>
                <div className="space-y-4">
                  {loading ? (
                    <p>Loading transactions...</p>
                  ) : expenses?.length > 0 ? (
                    expenses.slice(0, 5).map((expense) => (
                      <div
                        key={expense._id}
                        className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
                      >
                        <div>
                          <p className="font-medium text-gray-800">
                            {expense.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-bold text-lg text-indigo-600">
                          ${expense.amount.toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">
                      No recent transactions.
                    </p>
                  )}
                </div>
                {expenses.length > 5 && (
                  <p className="mt-4 text-sm text-center text-indigo-600 cursor-pointer hover:underline">
                    View all transactions
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {(activeView === "dashboard" || activeView === "all-expenses") && (
          // Expenses List Section
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              All Expenses
            </h2>
            {loading ? (
              <p>Loading expenses...</p>
            ) : expenses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${expense.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {expense.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(expense.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditClick(expense)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500">No expenses found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;