import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const muscleGroups = [
  {
    muscle: 'Chest',
    image: '/images/chest.jpg',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '12-15', timer: '30', gif: '/images/pushups.gif' },
      { name: 'Bench Press', sets: 4, reps: '10', timer: '45', gif: '/images/benchpress.gif' },
    ]
  },
  {
    muscle: 'Back',
    image: '/images/back.jpg',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: '8-10', timer: '30', gif: '/images/pullups.gif' },
      { name: 'Deadlifts', sets: 4, reps: '6', timer: '60', gif: '/images/deadlift.gif' },
    ]
  },
  {
    muscle: 'Legs',
    image: '/images/legs.jpg',
    exercises: [
      { name: 'Squats', sets: 4, reps: '10-12', timer: '45', gif: '/images/squats.gif' },
      { name: 'Lunges', sets: 3, reps: '12 each leg', timer: '30', gif: '/images/lunges.gif' },
    ]
  },
  {
    muscle: 'Biceps',
    image: '/images/biceps.jpg',
    exercises: [
      { name: 'Barbell Curl', sets: 3, reps: '10-12', timer: '30', gif: '/images/barbellcurl.gif' },
      { name: 'Hammer Curl', sets: 3, reps: '12', timer: '30', gif: '/images/hammercurl.gif' },
    ]
  },
  {
    muscle: 'Triceps',
    image: '/images/triceps.jpg',
    exercises: [
      { name: 'Triceps Dips', sets: 3, reps: '15', timer: '30', gif: '/images/tricepsdips.gif' },
      { name: 'Overhead Extension', sets: 3, reps: '12', timer: '30', gif: '/images/overheadext.gif' },
    ]
  },
  {
    muscle: 'Shoulders',
    image: '/images/shoulders.jpg',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '10', timer: '45', gif: '/images/overheadpress.gif' },
      { name: 'Lateral Raise', sets: 3, reps: '12', timer: '30', gif: '/images/lateralraise.gif' },
    ]
  },
  {
    muscle: 'Core',
    image: '/images/core.jpg',
    exercises: [
      { name: 'Plank', sets: 3, reps: '—', timer: '60', gif: '/images/plank.gif' },
      { name: 'Crunches', sets: 4, reps: '15', timer: '30', gif: '/images/crunches.gif' },
    ]
  },
];

const FitnessGuide = () => {
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    if (exercise.timer) {
      const seconds = parseInt(exercise.timer);
      setTimerSeconds(seconds);
      setIsCounting(true);
    }
  };

  useEffect(() => {
    let countdown;
    if (isCounting && timerSeconds > 0) {
      countdown = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isCounting, timerSeconds]);

  const lightTheme = "bg-white text-gray-800";
  const darkTheme = "bg-gradient-to-br from-gray-950 to-gray-900 text-white";

  return (
    <div className={`min-h-screen py-12 px-6 md:px-16 transition duration-300 ${darkMode ? darkTheme : lightTheme}`}>
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-full font-semibold text-sm bg-yellow-400 hover:bg-yellow-500 text-black shadow-md"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wide ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
      >
        🏋️‍♂️ Begin Your Epic Fitness Journey
      </motion.h1>

      {!selectedMuscle && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {muscleGroups.map((group, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedMuscle(group)}
              className="cursor-pointer relative rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400 transition duration-300"
            >
              <img src={group.image} alt={group.muscle} className="w-full h-40 object-cover rounded-t-xl" />
              <div className="bg-yellow-100 text-yellow-800 py-2 text-center font-bold text-lg rounded-b-xl">
                {group.muscle}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedMuscle && !selectedExercise && (
        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedMuscle(null)}
            className="mb-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-black font-semibold"
          >
            ← Back to Muscle Groups
          </motion.button>
          <h2 className="text-3xl font-bold text-yellow-600 mb-8 text-center">
            {selectedMuscle.muscle} Workouts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedMuscle.exercises.map((ex, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleExerciseClick(ex)}
                className="cursor-pointer bg-white border border-yellow-200 text-gray-800 rounded-xl p-5 shadow-md hover:shadow-yellow-400 transition duration-300"
              >
                <img src={ex.gif} alt={ex.name} className="w-full h-40 object-contain rounded mb-4" />
                <h3 className="text-xl font-bold text-center text-yellow-700">
                  {ex.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {selectedExercise && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 bg-white border border-yellow-200 text-gray-800 rounded-2xl p-8 shadow-2xl"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedExercise(null)}
            className="mb-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-black font-semibold"
          >
            ← Back to {selectedMuscle.muscle} Exercises
          </motion.button>
          <h2 className="text-3xl font-bold mb-4 text-center text-yellow-700">
            {selectedExercise.name}
          </h2>
          <img src={selectedExercise.gif} alt={selectedExercise.name} className="w-full h-64 object-contain rounded mb-6" />
          <div className="text-center space-y-2 text-lg">
            {selectedExercise.reps && (
              <p>
                🔁 Reps: <span className="font-semibold">{selectedExercise.reps}</span>
              </p>
            )}
            {selectedExercise.sets && (
              <p>
                📦 Sets: <span className="font-semibold">{selectedExercise.sets}</span>
              </p>
            )}
            {selectedExercise.timer && (
              <p>
                ⏱️ Timer: <span className="font-semibold">{timerSeconds}s</span>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FitnessGuide;
