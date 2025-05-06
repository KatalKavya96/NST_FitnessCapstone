import React, { useState } from 'react';
import Navbar from './components/Navbar';

const Profile = () => {
  const [name, setName] = useState('Kavya');
  const [goal, setGoal] = useState('Build Muscle');

  return (
    <>
      

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">👤 Your Profile</h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.pravatar.cc/100"
              alt="Avatar"
              className="rounded-full w-24 h-24 border-4 border-blue-500"
            />
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Fitness Goal</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="bg-gray-700 p-4 rounded-md text-sm text-gray-300">
              <p><strong>Streak:</strong>7 days</p>
              <p><strong>Level:</strong>Gold Challenger</p>
              <p><strong>Recent Goal:</strong>{goal}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
