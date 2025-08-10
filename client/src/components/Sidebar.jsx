


import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useAppStore from "../store/appStore"; // Import a new store for app state

const Sidebar = () => {
  const { logout } = useAuthStore();
  const { activeView, setActiveView } = useAppStore(); // Use the new app store
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4 flex flex-col font-sans">
      <div className="text-2xl font-bold mb-8">Expense Tracker</div>
      <nav className="flex-grow">
        <ul>
          <li className="mb-2">
            <button
              onClick={() => setActiveView("dashboard")}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeView === "dashboard"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Dashboard
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setActiveView("add-expense")}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeView === "add-expense"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Add New Expense
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setActiveView("expense-breakdown")}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeView === "expense-breakdown"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Expense Breakdown(Graph)
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setActiveView("recent-transactions")}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeView === "recent-transactions"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              Recent Transactions
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setActiveView("all-expenses")}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                activeView === "all-expenses"
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              All Expenses
            </button>
          </li>
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="w-full text-left p-3 rounded-lg bg-gray-700 hover:bg-red-600 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;