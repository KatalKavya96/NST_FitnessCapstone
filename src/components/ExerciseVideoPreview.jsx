import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExerciseVideoPreview = () => {
  const navigate = useNavigate();

  return (
    <div className="my-12 px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">
        🎥 Exercise Tutorial Videos
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Watch expert-guided workout tutorials for each muscle group. Learn the right form and get motivated!
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/exercise-videos')}
          className="px-6 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-full transition"
        >
          ▶️ Watch All Videos
        </button>
      </div>
    </div>
  );
};

export default ExerciseVideoPreview;
