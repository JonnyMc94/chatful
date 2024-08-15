import "./App.css";
import ConfirmationModal from "./modals/ConfirmationModal";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { getCurrentUser, fetchAuthSession, signInWithRedirect }  from '@aws-amplify/auth'
import React, { useEffect, useState } from 'react';
import Amplify from '@aws-amplify/core';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await signInWithRedirect();
        await fetchAuthSession({ forceRefresh: true });
        const user = await getCurrentUser();
        console.log('Authenticated user:', user); // Inspect the user object
        setIsAuthenticated(true);
      } catch (error) {
        console.error('No authenticated user:', error);
        setIsAuthenticated(false);
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
        <Route path="/logout" element={<ConfirmationModal {...modalProps} />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
