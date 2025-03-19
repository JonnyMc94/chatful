import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function SettingsPage() {
  const [username, setUsername] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleNotificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationsEnabled(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Save settings here
    console.log("Settings saved:", { username, notificationsEnabled });
  };

  return (
    <div className="flex h-screen w-screen bg-whatsapp">
      <Navbar />
      <div className="flex flex-grow mt-22 w-1/4">
        <Sidebar />
        <div className="flex flex-col items-center justify-center space-y-4 w-3/4 bg-white">
          <h1 className="text-4xl font-bold mb-4 text-slate-600">Settings</h1>
          <form onSubmit={handleSubmit}>
            <div className="m-6 flex flex-row gap-8">
              <label
                htmlFor="username"
                className="mt-2 text-lg font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="m-6">
              <div className="flex flex-row items-center jutify-center gap-8">
              <label
                htmlFor="notifications"
                className="text-lg font-medium text-gray-700"
              >
                Enable notifications
              </label>
              <input
                id="notifications"
                name="notifications"
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleNotificationsChange}
                className="h-6 w-6 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            </div>
            <button
              type="submit"
              className="m-4 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
