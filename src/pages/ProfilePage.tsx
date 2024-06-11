import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ConfirmationModal from "../modals/ConfirmationModal";

function ProfilePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-whatsapp">
      <Navbar />
      <div className="flex flex-grow mt-22">
        <Sidebar />
        <div className="flex flex-col items-center justify-center space-y-4 w-full bg-white p-10 rounded-lg m-5 shadow-lg">
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <h2 className="text-2xl text-gray-800">Jonathan</h2>
          <p className="text-gray-600">jonathanmc.jm94@gmail.com</p>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
      <ConfirmationModal
        title="Log Out"
        message="Are you sure you want to log out?"
        onConfirm={() => {
          console.log("User logged out");
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
        isLogout={true}
        showModal={showModal}
      />
    </div>
  );
}

export default ProfilePage;
