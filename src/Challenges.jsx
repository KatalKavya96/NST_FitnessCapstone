import React, { useState, useEffect, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import { useTheme } from './components/ThemeContext';

export const ChallengesContext = createContext();

export const useChallenges = () => {
  const context = useContext(ChallengesContext);
  if (!context) {
    throw new Error('useChallenges must be used within a ChallengesProvider');
  }
  return context;
};

const getRandomPoints = () => {
  const options = [10, 20, 30, 40, 50, 60, 70, 80];
  return options[Math.floor(Math.random() * options.length)];
};

const initialChallenges = [
  {
    id: 1,
    title: 'Run 2km',
    description: 'Complete a 2km run to boost your endurance.',
    type: 'Cardio',
    completed: false,
    custom: false,
    points: getRandomPoints(),
  },
  {
    id: 2,
    title: '50 Pushups',
    description: 'Do 50 pushups to strengthen your upper body.',
    type: 'Strength',
    completed: false,
    custom: false,
    points: getRandomPoints(),
  },
  {
    id: 3,
    title: '10-Min Meditation',
    description: 'Relax your mind with 10 minutes of guided meditation.',
    type: 'Mindfulness',
    completed: true,
    completedAt: new Date().toISOString(),
    custom: false,
    points: getRandomPoints(),
  },
  {
    id: 4,
    title: '5000 Steps',
    description: 'Hit your daily step goal to stay active.',
    type: 'Daily Goal',
    completed: false,
    custom: false,
    points: getRandomPoints(),
  }
];

export const ChallengesProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(() => {
    const savedChallenges = localStorage.getItem('challenges');
    if (savedChallenges) {
      const parsedChallenges = JSON.parse(savedChallenges);
      return parsedChallenges.filter(ch => {
        if (!ch.completed) return true;
        if (!ch.completedAt) return true;
        const completedTime = new Date(ch.completedAt);
        const now = new Date();
        const hoursDiff = (now - completedTime) / (1000 * 60 * 60);
        return hoursDiff <= 3;
      });
    }
    return initialChallenges;
  });

  useEffect(() => {
    localStorage.setItem('challenges', JSON.stringify(challenges));
  }, [challenges]);

  const toggleComplete = (id) => {
    setChallenges(prev => {
      const updatedChallenges = prev.map(ch =>
        ch.id === id ? { ...ch, completed: true, completedAt: new Date().toISOString() } : ch
      );
      return updatedChallenges.filter(ch => {
        if (!ch.completed) return true;
        if (!ch.completedAt) return true;
        const completedTime = new Date(ch.completedAt);
        const now = new Date();
        const hoursDiff = (now - completedTime) / (1000 * 60 * 60);
        return hoursDiff <= 3;
      });
    });
  };

  const removeChallenge = (id) => {
    setChallenges(prev => prev.filter(ch => ch.id !== id));
  };

  useEffect(() => {
    const cleanup = setInterval(() => {
      setChallenges(prev => prev.filter(ch => {
        if (!ch.completed) return true;
        if (!ch.completedAt) return true;
        const completedTime = new Date(ch.completedAt);
        const now = new Date();
        const hoursDiff = (now - completedTime) / (1000 * 60 * 60);
        return hoursDiff <= 3;
      }));
    }, 60000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <ChallengesContext.Provider value={{ 
      challenges,
      setChallenges,
      toggleComplete,
      removeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  );
};

const ChallengesContent = () => {
  const { challenges, setChallenges, toggleComplete, removeChallenge } = useChallenges();
  const { isDarkMode } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: ''
  });

  const handleAddCustomChallenge = (e) => {
    e.preventDefault();
    const newChallenge = {
      id: Date.now(),
      title: formData.title,
      description: formData.description || 'Custom challenge',
      type: formData.type || 'Custom',
      completed: false,
      custom: true,
      points: 10,
    };
    setChallenges(prev => [...prev, newChallenge]);
    setFormData({ title: '', description: '', type: '' });
    setShowForm(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black text-white' : 'bg-gradient-to-br from-blue-50 to-white text-gray-900'} px-4 py-6 md:px-12 transition-colors duration-200`}>
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Today's Challenges</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className={`${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-6 py-2 rounded-lg shadow transition-colors duration-200`}
        >
          {showForm ? 'Cancel' : 'Add Your Own Challenge'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddCustomChallenge}
          className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-xl mx-auto mb-8 shadow-md space-y-4 transition-colors duration-200`}
        >
          <input
            type="text"
            placeholder="Challenge Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className={`w-full p-3 rounded-md ${isDarkMode ? 'bg-gray-900 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-200'} border transition-colors duration-200`}
          />
          <textarea
            placeholder="Challenge Description (optional)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className={`w-full p-3 rounded-md ${isDarkMode ? 'bg-gray-900 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-200'} border transition-colors duration-200`}
          />
          <input
            type="text"
            placeholder="Type (e.g. Flexibility, Strength)"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className={`w-full p-3 rounded-md ${isDarkMode ? 'bg-gray-900 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-200'} border transition-colors duration-200`}
          />
          <button
            type="submit"
            className={`w-full ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded-lg transition-colors duration-200`}
          >
            Submit Custom Challenge (10 points)
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => (
          <div
            key={challenge.id}
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-5 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300`}
          >
            <h2 className="text-xl font-semibold mb-1">{challenge.title}</h2>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2`}>{challenge.description}</p>
            <p className="text-sm text-yellow-500 mb-2">Points: {challenge.points}</p>
            <span className={`inline-block ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white text-xs px-3 py-1 rounded-full mb-4 transition-colors duration-200`}>
              {challenge.type}
            </span>
            <div className="space-y-2">
              <div className="flex justify-between items-center gap-2">
                <button
                  onClick={() => !challenge.completed && toggleComplete(challenge.id)}
                  disabled={challenge.completed}
                  className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    challenge.completed
                      ? 'bg-green-500 cursor-not-allowed opacity-75'
                      : isDarkMode
                        ? 'bg-yellow-500 hover:bg-yellow-400'
                        : 'bg-yellow-400 hover:bg-yellow-300'
                  }`}
                >
                  {challenge.completed ? 'Completed' : 'Mark Complete'}
                </button>
                {challenge.custom && !challenge.completed && (
                  <button
                    onClick={() => removeChallenge(challenge.id)}
                    className={`${isDarkMode ? 'bg-red-500 hover:bg-red-400' : 'bg-red-400 hover:bg-red-300'} px-3 py-2 rounded-full text-xs font-semibold text-white transition-colors duration-200`}
                  >
                    Remove
                  </button>
                )}
              </div>
              {challenge.completed && challenge.completedAt && (
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center transition-colors duration-200`}>
                  Completed {new Date(challenge.completedAt).toLocaleTimeString()}
                  <br/>
                  <span className="text-yellow-500">(Disappears in 3 hours)</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesContent;
