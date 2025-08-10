// // server/routes/expenseRoutes.js
// const express = require("express");
// const {
//   getExpenses,
//   addExpense,
//   updateExpense,
//   deleteExpense,
//   getAllExpenses,
//   approveExpense, // Import the new controller function
//   rejectExpense, // Import the new controller function
// } = require("../controllers/expenseController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();

// router
//   .route("/")
//   .get(protect, getExpenses) // Get user's own expenses
//   .post(protect, addExpense);

// router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

// // Admin-only route to get all expenses from all users
// router.get("/admin", protect, admin, getAllExpenses);

// // New routes for approval workflow, protected by admin middleware
// router.put("/:id/approve", protect, admin, approveExpense);
// router.put("/:id/reject", protect, admin, rejectExpense);

// module.exports = router;

const express = require("express");
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getExpenses).post(protect, addExpense);
router.route("/:id").put(protect, updateExpense).delete(protect, deleteExpense);

module.exports = router;