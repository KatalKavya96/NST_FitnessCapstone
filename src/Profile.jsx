import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './components/ThemeContext';
import axios from 'axios';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/users/${user.uid}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error('Profile load error:', err));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user || !profile) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} flex items-center justify-center`}>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-400 h-12 w-12"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-400 rounded w-36"></div>
            <div className="h-4 bg-gray-400 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} py-10 px-4 transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden transition-colors duration-200`}>
          {/* Header with cover image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            {profile.coverPhoto && (
              <img
                src={profile.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Profile section */}
          <div className="relative px-6 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end sm:space-x-6 -mt-20 mb-6">
              <img
                src={user.photoURL || profile.avatarUrl || 'https://i.pravatar.cc/150'}
                alt={user.displayName || profile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                <h1 className="text-3xl font-bold">{user.displayName || profile.name}</h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email || profile.email}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => navigate('/edit-profile')}
                  className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors duration-200`}
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                >
                  🚪 Logout
                </button>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className="text-lg italic">{profile.bio}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <StatCard
                label="Total Points"
                value={profile.totalPoints || 0}
                icon="🏆"
                color={isDarkMode ? 'from-yellow-600 to-yellow-800' : 'from-yellow-400 to-yellow-600'}
              />
              <StatCard
                label="Friends"
                value={profile.friends?.length || 0}
                icon="👥"
                color={isDarkMode ? 'from-green-600 to-green-800' : 'from-green-400 to-green-600'}
              />
              <StatCard
                label="Followers"
                value={profile.followers?.length || 0}
                icon="👀"
                color={isDarkMode ? 'from-blue-600 to-blue-800' : 'from-blue-400 to-blue-600'}
              />
              <StatCard
                label="Day Streak"
                value={profile.streak || 0}
                icon="🔥"
                color={isDarkMode ? 'from-red-600 to-red-800' : 'from-red-400 to-red-600'}
              />
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className={`rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
                {profile.recentActivity?.length > 0 ? (
                  <ul className="space-y-3">
                    {profile.recentActivity.map((activity, index) => (
                      <li
                        key={index}
                        className={`flex items-center space-x-3 p-2 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        <span className="text-2xl">{activity.icon}</span>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-4">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className={`p-4 rounded-xl bg-gradient-to-br ${color} text-white`}>
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm opacity-90">{label}</div>
  </div>
);

export default Profile;
