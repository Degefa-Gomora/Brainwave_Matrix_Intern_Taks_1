


// aaaaaaaaaaaaaaaaaaaaaaaa
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useApi from "../hooks/useApi";
import expenseChartBg from "../assets/expence-min.jpg"; // Make sure this path is correct

const LandingPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const api = useApi();
  const { login } = useAuthStore();

  const { username, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
      }
    }

    try {
      const endpoint = isRegistering ? "/users/register" : "/users/login";
      const payload = isRegistering
        ? { username, email, password }
        : { email, password };

      const res = await api.post(endpoint, payload);
      login(res.data, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(`${isRegistering ? "Registration" : "Login"} failed:`, err);
      setError(
        err.response?.data?.message ||
          `${
            isRegistering ? "Registration" : "Login"
          } failed. Please check your credentials.`
      );
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 lg:p-12 bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${expenseChartBg})` }}
    >
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md bg-opacity-90">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? "Create an Account" : "Welcome Back To Expense Tracker app!"}
        </h2>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-xl text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {isRegistering && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          {isRegistering && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors duration-300 shadow-md"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsRegistering(false);
                  setError("");
                }}
                className="text-indigo-600 font-bold hover:underline transition-colors"
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setIsRegistering(true);
                  setError("");
                }}
                className="text-indigo-600 font-bold hover:underline transition-colors"
              >
                Register
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LandingPage;




