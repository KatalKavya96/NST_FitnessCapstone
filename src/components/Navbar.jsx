import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wider">FitZone</div>

      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/challenges" className="hover:text-blue-400">Challenges</Link>
        <Link to="/leaderboard" className="hover:text-blue-400">Leaderboard</Link>
      </div>

      <div className="relative">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="rounded-full w-8 h-8 cursor-pointer border-2 border-white"
          onClick={toggleDropdown}
        />

        {showDropdown && (
          <div className="absolute right-0 ml- mt-5 w-48 bg-gray-900 rounded-md shadow-lg z-10">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
              onClick={() => setShowDropdown(false)}
            >
              👤 Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm hover:bg-gray-700"
              onClick={() => setShowDropdown(false)}
            >
              ⚙️ Settings
            </Link>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
              onClick={() => {
                setShowDropdown(false);
              }}
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
