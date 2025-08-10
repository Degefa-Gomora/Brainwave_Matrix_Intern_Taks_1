
import React, { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController, // ✅ Register this
} from "chart.js";

// ✅ Register everything including BarController
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = ({ expenses }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(expenses) || expenses.length === 0) return;

    const ctx = canvasRef.current.getContext("2d");

    // ✅ Destroy old chart before creating new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const categoryData = expenses.reduce((acc, expense) => {
      acc[expense.category] =
        (acc[expense.category] || 0) + Number(expense.amount);
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(categoryData),
      datasets: [
        {
          label: "Expenses by Category",
          data: Object.values(categoryData),
          backgroundColor: [
            "#4A55A2",
            "#766C9E",
            "#A86464",
            "#F875AA",
            "#FF7000",
            "#C850C0",
          ],
          borderColor: "#fff",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };

    // ✅ Create the chart
    chartRef.current = new ChartJS(ctx, {
      type: "bar", // Important: matches BarController
      data: chartData,
      options: options,
    });

    // ✅ Clean up on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [expenses]);

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <p className="text-center text-gray-500">No data to display in chart.</p>
    );
  }

  return (
    <div className="h-72 w-full relative">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ExpenseChart;
