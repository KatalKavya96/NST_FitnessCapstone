import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/api/leaderboard')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load leaderboard:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-700">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 font-medium">{i + 1}</td>
                  <td className="py-2 px-4">{u.name}</td>
                  <td className="py-2 px-4 text-blue-600 font-semibold">
                    {u.totalPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
