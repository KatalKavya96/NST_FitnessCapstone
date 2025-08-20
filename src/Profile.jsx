import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './components/ThemeContext';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

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
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileClick = (userId) => {
    navigate(`/profile/${userId}`);
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
          <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            {profile.coverPhoto && (
              <img
                src={profile.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

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
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>

            {profile.bio && (
              <div className={`mt-6 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-inner`}>
                <p className="text-lg leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div
                onClick={() => setShowFollowers(true)}
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} p-4 rounded-lg cursor-pointer transition-colors duration-200 text-center`}
              >
                <div className="text-2xl font-bold">{profile.followers?.length || 0}</div>
                <div className="text-sm">Followers</div>
              </div>
              <div
                onClick={() => setShowFollowing(true)}
                className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} p-4 rounded-lg cursor-pointer transition-colors duration-200 text-center`}
              >
                <div className="text-2xl font-bold">{profile.following?.length || 0}</div>
                <div className="text-sm">Following</div>
              </div>
            </div>

            {showFollowers && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full mx-4`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Followers</h3>
                    <button onClick={() => setShowFollowers(false)} className="text-2xl">&times;</button>
                  </div>
                  {profile.followers?.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {profile.followers.map((follower) => (
                        <div
                          key={follower.id}
                          onClick={() => handleProfileClick(follower.id)}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <img
                            src={follower.avatarUrl || 'https://i.pravatar.cc/150'}
                            alt={follower.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-grow">
                            <div className="font-medium">{follower.name}</div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{follower.username}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xl mb-2">No followers yet</p>
                      <p className="text-gray-500">Connect to New People to grow your network!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showFollowing && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 max-w-md w-full mx-4`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Following</h3>
                    <button onClick={() => setShowFollowing(false)} className="text-2xl">&times;</button>
                  </div>
                  {profile.following?.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {profile.following.map((following) => (
                        <div
                          key={following.id}
                          onClick={() => handleProfileClick(following.id)}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <img
                            src={following.avatarUrl || 'https://i.pravatar.cc/150'}
                            alt={following.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-grow">
                            <div className="font-medium">{following.name}</div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{following.username}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xl mb-2">Not following anyone yet</p>
                      <p className="text-gray-500">Start following people to see their updates!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <StatCard
                label="Total Points"
                value={profile.totalPoints || 0}
                icon=""
                color={isDarkMode ? 'from-yellow-600 to-yellow-800' : 'from-yellow-400 to-yellow-600'}
              />
              <StatCard
                label="Friends"
                value={profile.friends?.length || 0}
                icon=""
                color={isDarkMode ? 'from-green-600 to-green-800' : 'from-green-400 to-green-600'}
              />
              <StatCard
                label="Day Streak"
                value={profile.streak || 0}
                icon=""
                color={isDarkMode ? 'from-red-600 to-red-800' : 'from-red-400 to-red-600'}
              />
              <StatCard
                label="Achievements"
                value={profile.achievements?.length || 0}
                icon=""
                color={isDarkMode ? 'from-purple-600 to-purple-800' : 'from-purple-400 to-purple-600'}
              />
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
              <div className={`rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 shadow-inner`}>
                {profile.recentActivity?.length > 0 ? (
                  <ul className="space-y-3">
                    {profile.recentActivity.map((activity, index) => (
                      <li
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} transition-colors duration-200`}
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
  <div className={`p-4 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}>
    <div className="text-3xl mb-2">{icon}</div>
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm opacity-90">{label}</div>
  </div>
);

export default Profile;
