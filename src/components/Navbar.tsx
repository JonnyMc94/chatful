import React, { useState } from "react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 h-22 bg-teal-400 z-20">
      <div className="flex justify-between items-center p-4">
        <span className="font-extrabold font-serif">Chatful</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
            alt="My Avatar"
            className="w-16 h-16 rounded-full"
          />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-16 w-48 bg-white rounded-md shadow-lg py-1 z-30">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
