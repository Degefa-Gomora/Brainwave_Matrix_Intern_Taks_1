


import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./store/authStore";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ children }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  const { token } = useAuthStore(); // You don't need this line here anymore
  return (
    <Router>
      <Routes>
        {/* The LandingPage is now the default route for unauthenticated users */}
        <Route path="/" element={<LandingPage />} />

        {/* The Dashboard is protected, so only authenticated users can access it */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unmatched routes to the landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;