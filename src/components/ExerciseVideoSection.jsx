import React from 'react';

const videos = [
  {
    title: 'Chest Workout – Perfect Pushup Form',
    url: 'https://www.youtube.com/embed/IODxDxX7oi4',
  },
  {
    title: 'Back Workout – Pullups & Rows',
    url: 'https://www.youtube.com/embed/eGo4IYlbE5g',
  },
  {
    title: 'Leg Day Routine – Squats & Lunges',
    url: 'https://www.youtube.com/embed/2-7eXJQeijU',
  },
  {
    title: 'Biceps Blast – Curls & Form Tips',
    url: 'https://www.youtube.com/embed/kwG2ipFRgfo',
  },
  {
    title: 'Triceps Workout – Dips & Extensions',
    url: 'https://www.youtube.com/embed/6SS1zVIge0g',
  },
  {
    title: 'Shoulder Strength – Press & Raise',
    url: 'https://www.youtube.com/embed/qEwKCR5JCog',
  },
  {
    title: 'Core & Abs – Plank & Crunch',
    url: 'https://www.youtube.com/embed/1919eTCoESo',
  },
  {
    title: 'Full Body HIIT – 20 Min Fat Burn',
    url: 'https://www.youtube.com/embed/ml6cT4AZdqI',
  },
  {
    title: 'Dynamic Warm-Up – 5 Minute Prep',
    url: 'https://www.youtube.com/embed/5z2Mn0F1nNw',
  },
  {
    title: 'Stretch & Flexibility Routine',
    url: 'https://www.youtube.com/embed/v7AYKMP6rOE',
  },
];
const ExerciseVideos = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">
        🎬 Workout Video Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-blue-50 p-4 rounded-xl shadow hover:shadow-lg transition">
            <iframe
              width="100%"
              height="200"
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded mb-3"
            ></iframe>
            <h3 className="text-lg font-semibold text-gray-800 text-center">{video.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseVideos;

