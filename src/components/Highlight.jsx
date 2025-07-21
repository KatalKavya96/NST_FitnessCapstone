import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const Highlight = ({ title, description, points, type, link }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-900'} p-6 rounded-xl mb-8 shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-800'}`}>Random Challenge</p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-200 text-blue-800'}`}>
              {type}
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>{description}</p>
          <div className="flex items-center gap-2">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              {points} points
            </p>
          </div>
        </div>
        <Link to={link} className="flex-shrink-0">
          <button 
            className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-500'} 
              px-6 py-2 rounded-full text-white font-semibold transition-all duration-300 
              transform hover:scale-105 flex items-center gap-2`}
          >
            Start Challenge
            <span className="text-lg">→</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Highlight;
