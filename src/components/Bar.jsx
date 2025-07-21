import { useTheme } from './ThemeContext';

const ProgressBar = ({ current, total }) => {
  const { isDarkMode } = useTheme();
  const percent = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Progress Overview
        </p>
        <span className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
          {Math.round(percent)}%
        </span>
      </div>
      <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} h-4 rounded-full overflow-hidden`}>
        <div
          className={`${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'} h-full rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className={`text-sm mt-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex items-center gap-2`}>
        <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {current} of {total}
        </span>
        challenges completed
      </p>
    </div>
  );
};

export default ProgressBar;
  