import React, { useState } from 'react';
import axios from 'axios';

const AddChallenge = ({ onChallengeAdded }) => {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/challenge/create', { title, points, duration });
    onChallengeAdded(); // callback to refresh UI
    setTitle('');
    setPoints('');
    setDuration('');
  };

  return (
    <form className="bg-white p-4 rounded-xl shadow mb-6" onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold mb-3">Add Custom Challenge</h3>
      <input
        type="text"
        placeholder="Challenge Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="number"
        placeholder="Points"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        required
      />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Challenge
      </button>
    </form>
  );
};

export default AddChallenge;
