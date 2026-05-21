import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Requirements from "../pages/Requirements";
import ProtectedRoute from "../components/common/ProtectedRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/requirements"
        element={
          <ProtectedRoute>
            <Requirements />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;