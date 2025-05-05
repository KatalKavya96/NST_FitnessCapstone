import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-2xl font-bold tracking-wider">Evolvium</div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <Link to="/" className="hover:text-blue-400 block mt-2 md:mt-0">Home</Link>
        <Link to="/challenges" className="hover:text-blue-400 block mt-2 md:mt-0">Challenges</Link>
        <Link to="/leaderboard" className="hover:text-blue-400 block mt-2 md:mt-0">Leaderboard</Link>
        <Link to="/profile" className="hover:text-blue-400 block mt-2 md:mt-0">Profile</Link>
      </div>

      <div className="hidden md:block">
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="rounded-full w-8 h-8 ml-4"
        />
      </div>
    </nav>
  );
}
