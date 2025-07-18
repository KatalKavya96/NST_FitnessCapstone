import React from 'react';

const ExercisePreview = () => {
  const previewMuscles = ['Chest', 'Back', 'Legs'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {previewMuscles.map((muscle, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <img
            src={`/assets/${muscle.toLowerCase()}.jpeg`}
            alt={muscle}
            className="w-30 h-35 mb-3 object-cover rounded-lg"
          />
          <h3 className="text-lg font-bold text-gray-800">{muscle}</h3>
          <p className="text-sm text-gray-500">Top exercises for {muscle}</p>
        </div>
      ))}
    </div>
  );
};

export default ExercisePreview;
