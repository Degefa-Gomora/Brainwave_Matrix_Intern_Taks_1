// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");

// // const UserSchema = new mongoose.Schema(
// //   {
// //     username: {
// //       type: String,
// //       required: [true, "Username is required"],
// //       unique: true,
// //       trim: true,
// //       minlength: 3,
// //     },
// //     email: {
// //       type: String,
// //       required: [true, "Email is required"],
// //       unique: true,
// //       trim: true,
// //       match: [/.+\@.+\..+/, "Please fill a valid email address"],
// //     },
// //     password: {
// //       type: String,
// //       required: [true, "Password is required"],
// //       minlength: 8,
// //     },
// //     role: {
// //       type: String,
// //       enum: ["user", "admin"], // Role-Based Access Control
// //       default: "user",
// //     },
// //   },
// //   { timestamps: true }
// // );

// // // Hash the password before saving the user
// // UserSchema.pre("save", async function (next) {
// //   if (!this.isModified("password")) {
// //     return next();
// //   }
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // Method to compare passwords
// // UserSchema.methods.comparePassword = async function (candidatePassword) {
// //   return await bcrypt.compare(candidatePassword, this.password);
// // };

// // module.exports = mongoose.model("User", UserSchema);

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const UserSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "Please add a name"],
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Please add an email"],
//       unique: true,
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Please fill a valid email address",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "Please add a password"],
//       minlength: 6,
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// // Hash password before saving
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Method to compare passwords
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", UserSchema);


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);