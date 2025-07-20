import React from 'react';
import { useChallenges } from './Challenges';
import { useTheme } from './components/ThemeContext';

// Hardcoded users with their points
const dummyUsers = [
  { name: 'Kavya Katal', id: 'me', totalPoints: 0 },
  { name: 'Neelanshu', totalPoints: 320 },
  { name: 'Aarya', totalPoints: 250 },
  { name: 'Ravi', totalPoints: 180 },
];

const calculatePoints = (challenges) => {
  return challenges.reduce((sum, ch) => {
    if (!ch.completed || !ch.completedAt) return sum;
    const completedTime = new Date(ch.completedAt);
    const now = new Date();
    const hoursDiff = (now - completedTime) / (1000 * 60 * 60);
    if (hoursDiff <= 3) {
      return sum + (ch.points || 0);
    }
    return sum;
  }, 0);
};

const Leaderboard = () => {
  const { challenges } = useChallenges();
  const { isDarkMode } = useTheme();
  const yourPoints = calculatePoints(challenges);
  
  const updatedUsers = dummyUsers.map(user =>
    user.id === 'me' ? { ...user, totalPoints: yourPoints } : user
  );

  const sortedUsers = [...updatedUsers].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-gradient-to-br from-blue-50 to-white text-gray-900'} py-12 px-4 md:px-12 transition-colors duration-200`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">🏆 Fitness Champions</h2>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Compete, achieve, and rise to the top!</p>
        </div>

        {sortedUsers.length === 0 ? (
          <div className="text-center py-8">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg`}>No champions yet. Be the first to conquer the leaderboard!</p>
          </div>
        ) : (
          <div className={`${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border transition-colors duration-200`}>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className={`${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'} text-left transition-colors duration-200`}>
                    <th className="py-4 px-6 font-semibold">Rank</th>
                    <th className="py-4 px-6 font-semibold">Champion</th>
                    <th className="py-4 px-6 font-semibold">Achievement Points</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user, index) => (
                    <tr 
                      key={user.name} 
                      className={`${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b transition-all duration-200 ${
                        user.id === 'me' 
                          ? isDarkMode 
                            ? 'bg-blue-900/20 hover:bg-blue-900/30' 
                            : 'bg-blue-50 hover:bg-blue-100'
                          : isDarkMode
                            ? 'hover:bg-gray-700/30'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          <span className="font-medium">{index + 1}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{user.name}</span>
                          {user.id === 'me' && (
                            <span className={`text-xs ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'} px-2 py-1 rounded-full transition-colors duration-200`}>
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-yellow-500">{user.totalPoints}</span>
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>pts</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className={`mt-8 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          <p>Complete challenges to earn points and climb the ranks! 💪</p>
          <p className="mt-2">Points from challenges completed within the last 3 hours count towards your ranking.</p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
