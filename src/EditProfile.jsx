import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/components/AuthContext';
import { useTheme } from './components/ThemeContext';
import axios from './apis/axiosInstance';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { user, signOut } = useAuth();
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatarUrl: '',
    coverPhoto: '',
    location: '',
    interests: [],
    socialLinks: {
      instagram: '',
      twitter: '',
      facebook: ''
    },
    fitnessGoals: [],
    preferredWorkoutTime: ''
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user.uid}`)
        .then((res) => {
          setFormData({
            name: res.data.name || user.displayName || '',
            bio: res.data.bio || '',
            avatarUrl: res.data.avatarUrl || user.photoURL || '',
            coverPhoto: res.data.coverPhoto || '',
            location: res.data.location || '',
            interests: res.data.interests || [],
            socialLinks: res.data.socialLinks || {
              instagram: '',
              twitter: '',
              facebook: ''
            },
            fitnessGoals: res.data.fitnessGoals || [],
            preferredWorkoutTime: res.data.preferredWorkoutTime || ''
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load profile data', err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInterestsChange = (e) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, interests: value }));
  };

  const handleFitnessGoalsChange = (e) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, fitnessGoals: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      await axios.put(`/users/${user.uid}`, formData);
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update profile.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user || loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} flex items-center justify-center`}>
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'} py-10 px-4 transition-colors duration-200`}>
      <div className="max-w-2xl mx-auto">
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
            >
              🚪 Logout
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Section */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </section>

            {/* Bio Section */}
            <section>
              <label className="block mb-1 text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
              ></textarea>
            </section>

            {/* Photos Section */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Profile Photos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Avatar URL</label>
                  <input
                    type="url"
                    name="avatarUrl"
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                    value={formData.avatarUrl}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Cover Photo URL</label>
                  <input
                    type="url"
                    name="coverPhoto"
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                    value={formData.coverPhoto}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Instagram</label>
                  <input
                    type="url"
                    name="socialLinks.instagram"
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                    value={formData.socialLinks.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Twitter</label>
                  <input
                    type="url"
                    name="socialLinks.twitter"
                    className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                    value={formData.socialLinks.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                  />
                </div>
              </div>
            </section>

            {/* Fitness Preferences Section */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold">Fitness Preferences</h3>
              <div>
                <label className="block mb-1 text-sm font-medium">Interests (comma-separated)</label>
                <input
                  type="text"
                  name="interests"
                  className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                  value={formData.interests.join(', ')}
                  onChange={handleInterestsChange}
                  placeholder="yoga, running, weightlifting"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Fitness Goals (comma-separated)</label>
                <input
                  type="text"
                  name="fitnessGoals"
                  className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                  value={formData.fitnessGoals.join(', ')}
                  onChange={handleFitnessGoalsChange}
                  placeholder="weight loss, muscle gain, flexibility"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Preferred Workout Time</label>
                <select
                  name="preferredWorkoutTime"
                  className={`w-full px-4 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 focus:ring-blue-500' : 'bg-gray-50 focus:ring-blue-500'} border-0 focus:ring-2 transition-colors duration-200`}
                  value={formData.preferredWorkoutTime}
                  onChange={handleChange}
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="night">Night</option>
                </select>
              </div>
            </section>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className={`px-6 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
