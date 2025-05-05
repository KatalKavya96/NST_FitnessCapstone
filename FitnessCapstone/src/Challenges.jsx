import React, { useState } from 'react';
import Navbar from './components/Navbar';

const Challenges = () => {
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: '🏃‍♂️ Run 2km',
      description: 'Complete a 2km run to boost your endurance.',
      type: 'Cardio',
      completed: false,
    },
    {
      id: 2,
      title: '💪 50 Pushups',
      description: 'Do 50 pushups to strengthen your upper body.',
      type: 'Strength',
      completed: false,
    },
    {
      id: 3,
      title: '🧘 10-Min Meditation',
      description: 'Relax your mind with 10 minutes of guided meditation.',
      type: 'Mindfulness',
      completed: true,
    },
    {
      id: 4,
      title: '🚶 5000 Steps',
      description: 'Hit your daily step goal to stay active.',
      type: 'Daily Goal',
      completed: false,
    }
  ]);

  const toggleComplete = (id) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id ? { ...challenge, completed: !challenge.completed } : challenge
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">🔥 Today's Challenges</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <div
              key={challenge.id}
              className="bg-gray-800 p-5 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <h2 className="text-xl font-semibold mb-1">{challenge.title}</h2>
              <p className="text-gray-300 text-sm mb-3">{challenge.description}</p>
              <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-4">
                {challenge.type}
              </span>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => toggleComplete(challenge.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    challenge.completed
                      ? 'bg-green-500 hover:bg-green-400'
                      : 'bg-yellow-500 hover:bg-yellow-400'
                  }`}
                >
                  {challenge.completed ? 'Completed ✅' : 'Mark as Complete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Challenges;
