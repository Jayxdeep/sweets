import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import { isAuthenticated } from "./utils/auth";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          isAuthenticated() ? <Navigate to="/" replace /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          isAuthenticated() ? <Navigate to="/" replace /> : <Register />
        }
      />

      {/* Protected Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
