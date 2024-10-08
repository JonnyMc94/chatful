import "./App.css";
import ConfirmationModal from "./modals/ConfirmationModal";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token != null) {
          // Optionally, you can verify the token with the backend
          const response = await axios.get("http://localhost:3000/auth/verify-token", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.log("Error verifying token:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const modalProps = {
    title: "Logout Confirmation",
    message: "Are you sure you want to logout?",
    onConfirm: () => console.log("Confirming action..."),
    onCancel: () => console.log("Cancelled action"),
    isLogout: true,
    showModal: true,
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<ConfirmationModal {...modalProps} />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;