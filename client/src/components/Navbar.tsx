import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-22 bg-teal-400 z-20">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="font-extrabold font-serif text-5xl">
          Chatful
        </Link>
        <div className="flex flex-row bg-teal-400 text-white">
          {isOpen && (
            <div className="flex flex-row items-center bg-teal-400 text-white gap-6">
              <Link
                to="/profile"
                className="block mr-6 text-xl hover:text-teal-500"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block mr-6 text-xl hover:text-teal-500"
              >
                Settings
              </Link>
              <Link
                to="/logout"
                className="block mr-6 text-xl hover:text-teal-500"
              >
                Logout
              </Link>
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)}>
            <img
              src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
              alt="My Avatar"
              className="w-16 h-16 rounded-full"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
