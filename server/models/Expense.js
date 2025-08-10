// const mongoose = require("mongoose");

// const ExpenseSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     description: {
//       type: String,
//       required: [true, "Description is required"],
//       trim: true,
//     },
//     amount: {
//       type: Number,
//       required: [true, "Amount is required"],
//       min: [0, "Amount cannot be negative"],
//     },
//     category: {
//       type: String,
//       enum: [
//         "Food",
//         "Transport",
//         "Utilities",
//         "Entertainment",
//         "Health",
//         "Other",
//       ],
//       required: [true, "Category is required"],
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     status: {
//       type: String,
//       enum: ["Pending", "Approved", "Rejected"],
//       default: "Pending",
//     },
//     approver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Expense", ExpenseSchema);


const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transport",
        "Utilities",
        "Entertainment",
        "Health",
        "Other",
      ],
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", ExpenseSchema);