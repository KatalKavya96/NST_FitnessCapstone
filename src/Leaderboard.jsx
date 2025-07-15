import React from 'react';
import Navbar from './components/Navbar';

const Leaderboard = () => {
  const fakeLeaderboard = [
    { id: 1, name: 'Kavya', points: 1240, avatar: 'https://i.pravatar.cc/40?img=1' },
    { id: 2, name: 'Satya', points: 1190, avatar: 'https://i.pravatar.cc/40?img=2' },
    { id: 3, name: 'Ankit', points: 1025, avatar: 'https://i.pravatar.cc/40?img=3' },
    { id: 4, name: 'Chaitanya', points: 890, avatar: 'https://i.pravatar.cc/40?img=4' },
    { id: 5, name: 'Pratyush', points: 870, avatar: 'https://i.pravatar.cc/40?img=5' },
  ];

  return (
    <>
      

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-6 md:px-12">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Leaderboard</h1>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
          {fakeLeaderboard.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-4 border-b border-gray-700 hover:bg-gray-700 transition"
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold w-6">{index + 1}</span>
                <img src={user.avatar}  className="w-10 h-10 rounded-full" />
                <p className="text-base font-medium">{user.name}</p>
              </div>
              <p className="text-sm font-semibold">{user.points} pts</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
