import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? 'backdrop-blur-md bg-opacity-90' : ''} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} px-6 py-4 flex justify-between items-center shadow-md transition-all duration-300`}>
      <Link to="/" className="flex items-center space-x-2 group">
        <div className="text-2xl font-bold tracking-wider group-hover:scale-105 transition-transform duration-200">FitZone</div>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {[
          { path: '/', label: 'Home' },
          { path: '/challenges', label: 'Challenges' },
          { path: '/leaderboard', label: 'Leaderboard' }
        ].map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`relative px-2 py-1 transition-all duration-200 ${isActive(path) ? (isDarkMode ? 'text-blue-400' : 'text-blue-600') : ''}`}
          >
            {label}
            <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-200 ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} ${isActive(path) ? 'scale-x-100' : ''}`} />
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transform hover:scale-110 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-200 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-600'} focus:ring-opacity-50`}
          aria-label="Toggle theme"
        >
          <span className="text-xl">{isDarkMode ? '🌙' : '☀️'}</span>
        </button>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`relative overflow-hidden rounded-full transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-600'} focus:ring-opacity-50`}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 object-cover"
            />
          </button>

          {showDropdown && (
            <div className={`absolute right-0 mt-3 w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg z-50 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden transform transition-all duration-200 ease-out`}>
              {[
                { to: '/profile', icon: '👤', label: 'Profile' },
                { to: '/settings', icon: '⚙️', label: 'Settings' }
              ].map(({ to, icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-3 px-4 py-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}
                  onClick={() => setShowDropdown(false)}
                >
                  <span className="text-xl">{icon}</span>
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200 text-red-500`}
                onClick={() => setShowDropdown(false)}
              >
                <span className="text-xl">🚪</span>
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
