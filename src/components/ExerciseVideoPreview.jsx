import React from 'react';
import { useNavigate } from 'react-router-dom';

const previewVideos = [
  {
    title: 'Chest Workout – Pushup Form',
    url: 'https://www.youtube.com/embed/IODxDxX7oi4',
  },
  {
    title: 'Leg Day – Squats & Lunges',
    url: 'https://www.youtube.com/embed/2-7eXJQeijU',
  },
  {
    title: 'Core Strength – Plank & Crunch',
    url: 'https://www.youtube.com/embed/1919eTCoESo',
  },
  {
    title: 'HIIT Fat Burn – Full Body',
    url: 'https://www.youtube.com/embed/ml6cT4AZdqI',
  },
];

const ExerciseVideoPreview = () => {
  const navigate = useNavigate();

  return (
    <div className="my-12 px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-blue-700 text-center">
        Exercise Tutorial Videos
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Watch expert-guided workouts for key muscle groups and perfect your form.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl mx-auto">
        {previewVideos.map((video, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow hover:shadow-lg transition">
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
              className="w-full h-48 rounded-t-xl"
            ></iframe>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-center text-gray-800">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>

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
