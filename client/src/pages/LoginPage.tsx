import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", { username, password });
      const { token } = response.data;
      // Store the token in localStorage or context
      localStorage.setItem("token", token);
      console.log("Login successful");
      navigate("/");
    } catch (err) {
      console.log("Error logging in:", err);
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault()
    signIn();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        <button
          onClick={handleLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
        <div className="text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;