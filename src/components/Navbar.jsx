import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleModalClose = () => {
    setShowAuthModal(false);
    setAuthMode('signin');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 ${scrolled ? 'backdrop-blur-md bg-opacity-90' : ''} ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} px-6 py-4 flex justify-between items-center shadow-md transition-all duration-300`}>
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
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`relative overflow-hidden rounded-full transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-blue-400' : 'focus:ring-blue-600'} focus:ring-opacity-50`}
              >
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/40'}
                  alt="User Avatar"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </button>

              {showDropdown && (
                <div className={`absolute right-0 mt-3 w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg z-50 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden transform transition-all duration-200 ease-out`}>
                  <Link
                    to="/profile"
                    className={`flex items-center space-x-3 px-4 py-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200`}
                    onClick={() => setShowDropdown(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Profile</span>
                  </Link>
                  <button
                    className={`w-full flex items-center space-x-3 px-4 py-3 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors duration-200 text-red-500`}
                    onClick={handleLogout}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleAuthClick('signin')}
                className={`px-4 py-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick('signup')}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={handleModalClose}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

export default Navbar;
