import React from 'react';
import { useTheme } from './ThemeContext';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={`
        min-h-screen 
        pt-16 sm:pt-20 
        transition-colors 
        duration-200 
        ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}
      `}
    >
      <main 
        className={`
          container 
          mx-auto 
          px-4 sm:px-6 lg:px-8 
          py-4 sm:py-6 lg:py-8
          transition-all 
          duration-200 
          ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}
        `}
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;