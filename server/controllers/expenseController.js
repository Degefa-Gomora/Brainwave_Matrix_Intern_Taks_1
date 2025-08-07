

const Expense = require("../models/Expense");

// @desc    Get all expenses for a user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = async (req, res) => {
  const { description, amount, category, date } = req.body;
  try {
    const newExpense = new Expense({
      user: req.user._id,
      description,
      amount,
      category,
      date,
    });
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Invalid expense data" });
  }
};

// @desc    Update an existing expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Expense not found or user not authorized" });
    }
    expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: "Invalid expense data" });
  }
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Expense not found or user not authorized" });
    }
    await expense.deleteOne();
    res.status(200).json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};