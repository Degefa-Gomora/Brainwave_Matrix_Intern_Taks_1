// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";

// const Header = () => {
//   const { user, logout } = useAuthStore();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <header className="flex items-center justify-between p-4 bg-white shadow-md">
//       <h1 className="text-xl font-bold">Welcome, {user?.username}</h1>
//       <button
//         onClick={handleLogout}
//         className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
//       >
//         Logout
//       </button>
//     </header>
//   );
// };

// export default Header;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const { token, setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Expense Tracker
        </Link>
        <div>
          {token ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-indigo-600 mr-4"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-indigo-600 mr-4"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-indigo-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;