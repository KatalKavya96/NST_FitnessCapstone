import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const muscleGroups = [
  {
    muscle: 'Chest',
    image: '/assets/chest.jpeg',
    exercises: [
      { name: 'Push-ups', sets: 3, reps: '12-15', timer: '30', gif: '/images/pushups.gif' },
      { name: 'Bench Press', sets: 4, reps: '10', timer: '45', gif: '/images/benchpress.gif' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', timer: '45', gif: '/images/inclinepress.gif' },
      { name: 'Dips', sets: 3, reps: '8-12', timer: '30', gif: '/images/dips.gif' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', timer: '30', gif: '/images/cableflyes.gif' },
      { name: 'Decline Push-ups', sets: 3, reps: '10-12', timer: '30', gif: '/images/declinepushups.gif' },
      { name: 'Dumbbell Flyes', sets: 3, reps: '12-15', timer: '30', gif: '/images/dumbbellflyes.gif' },
      { name: 'Machine Press', sets: 3, reps: '12-15', timer: '45', gif: '/images/machinepress.gif' },
      { name: 'Resistance Band Press', sets: 3, reps: '15-20', timer: '30', gif: '/images/bandpress.gif' },
      { name: 'Plate Press', sets: 3, reps: '12-15', timer: '30', gif: '/images/platepress.gif' }
    ]
  },
  {
    muscle: 'Back',
    image: '/assets/back.jpeg',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: '8-10', timer: '30', gif: '/images/pullups.gif' },
      { name: 'Deadlifts', sets: 4, reps: '6', timer: '60', gif: '/images/deadlift.gif' },
      { name: 'Barbell Rows', sets: 3, reps: '10-12', timer: '45', gif: '/images/barbellrows.gif' },
      { name: 'Lat Pulldowns', sets: 3, reps: '12-15', timer: '30', gif: '/images/latpulldowns.gif' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', timer: '30', gif: '/images/facepulls.gif' },
      { name: 'T-Bar Rows', sets: 3, reps: '10-12', timer: '45', gif: '/images/tbarrows.gif' },
      { name: 'Seated Cable Rows', sets: 3, reps: '12-15', timer: '30', gif: '/images/cablerows.gif' },
      { name: 'Dumbbell Rows', sets: 3, reps: '10-12', timer: '30', gif: '/images/dumbbellrows.gif' },
      { name: 'Hyperextensions', sets: 3, reps: '12-15', timer: '30', gif: '/images/hyperextensions.gif' },
      { name: 'Meadows Rows', sets: 3, reps: '10-12', timer: '45', gif: '/images/meadowsrows.gif' }
    ]
  },
  {
    muscle: 'Legs',
    image: '/assets/legs.jpeg',
    exercises: [
      { name: 'Squats', sets: 4, reps: '10-12', timer: '45', gif: '/images/squats.gif' },
      { name: 'Lunges', sets: 3, reps: '12 each leg', timer: '30', gif: '/images/lunges.gif' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', timer: '45', gif: '/images/rdl.gif' },
      { name: 'Leg Press', sets: 3, reps: '12-15', timer: '45', gif: '/images/legpress.gif' },
      { name: 'Calf Raises', sets: 4, reps: '15-20', timer: '30', gif: '/images/calfraises.gif' },
      { name: 'Leg Extensions', sets: 3, reps: '12-15', timer: '30', gif: '/images/legextensions.gif' },
      { name: 'Leg Curls', sets: 3, reps: '12-15', timer: '30', gif: '/images/legcurls.gif' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12 each leg', timer: '45', gif: '/images/bulgariansquats.gif' },
      { name: 'Hip Thrusts', sets: 3, reps: '12-15', timer: '45', gif: '/images/hipthrusts.gif' },
      { name: 'Box Jumps', sets: 3, reps: '10', timer: '30', gif: '/images/boxjumps.gif' }
    ]
  },
  {
    muscle: 'Biceps',
    image: '/assets/biceps.jpeg',
    exercises: [
      { name: 'Barbell Curl', sets: 3, reps: '10-12', timer: '30', gif: '/images/barbellcurl.gif' },
      { name: 'Hammer Curl', sets: 3, reps: '12', timer: '30', gif: '/images/hammercurl.gif' },
      { name: 'Incline Dumbbell Curl', sets: 3, reps: '12-15', timer: '30', gif: '/images/inclinecurl.gif' },
      { name: 'Preacher Curl', sets: 3, reps: '10-12', timer: '30', gif: '/images/preachercurl.gif' },
      { name: 'Concentration Curl', sets: 3, reps: '12-15', timer: '30', gif: '/images/concentrationcurl.gif' },
      { name: 'Cable Curl', sets: 3, reps: '12-15', timer: '30', gif: '/images/cablecurl.gif' },
      { name: 'EZ Bar Curl', sets: 3, reps: '10-12', timer: '30', gif: '/images/ezbarcurl.gif' },
      { name: 'Spider Curl', sets: 3, reps: '12-15', timer: '30', gif: '/images/spidercurl.gif' },
      { name: 'Reverse Curl', sets: 3, reps: '12-15', timer: '30', gif: '/images/reversecurl.gif' },
      { name: '21s', sets: 3, reps: '21', timer: '45', gif: '/images/21s.gif' }
    ]
  },
  {
    muscle: 'Triceps',
    image: '/assets/triceps.jpeg',
    exercises: [
      { name: 'Triceps Dips', sets: 3, reps: '15', timer: '30', gif: '/images/tricepsdips.gif' },
      { name: 'Overhead Extension', sets: 3, reps: '12', timer: '30', gif: '/images/overheadext.gif' },
      { name: 'Rope Pushdowns', sets: 3, reps: '12-15', timer: '30', gif: '/images/ropepushdowns.gif' },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', timer: '30', gif: '/images/skullcrushers.gif' },
      { name: 'Close Grip Bench', sets: 3, reps: '10-12', timer: '45', gif: '/images/closegripbench.gif' },
      { name: 'Diamond Push-ups', sets: 3, reps: '12-15', timer: '30', gif: '/images/diamondpushups.gif' },
      { name: 'V-Bar Pushdowns', sets: 3, reps: '12-15', timer: '30', gif: '/images/vbarpushdowns.gif' },
      { name: 'Kickbacks', sets: 3, reps: '12-15', timer: '30', gif: '/images/kickbacks.gif' },
      { name: 'Bench Dips', sets: 3, reps: '15-20', timer: '30', gif: '/images/benchdips.gif' },
      { name: 'One Arm Extensions', sets: 3, reps: '12-15', timer: '30', gif: '/images/onearmext.gif' }
    ]
  },
  {
    muscle: 'Shoulders',
    image: '/assets/shoulders.jpeg',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '10', timer: '45', gif: '/images/overheadpress.gif' },
      { name: 'Lateral Raise', sets: 3, reps: '12', timer: '30', gif: '/images/lateralraise.gif' },
      { name: 'Front Raise', sets: 3, reps: '12-15', timer: '30', gif: '/images/frontraise.gif' },
      { name: 'Face Pulls', sets: 3, reps: '15-20', timer: '30', gif: '/images/facepulls.gif' },
      { name: 'Upright Rows', sets: 3, reps: '12-15', timer: '30', gif: '/images/uprightrows.gif' },
      { name: 'Arnold Press', sets: 3, reps: '10-12', timer: '45', gif: '/images/arnoldpress.gif' },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15', timer: '30', gif: '/images/reverseflyes.gif' },
      { name: 'Military Press', sets: 3, reps: '8-10', timer: '45', gif: '/images/militarypress.gif' },
      { name: 'Plate Raises', sets: 3, reps: '12-15', timer: '30', gif: '/images/plateraises.gif' },
      { name: 'Cable Laterals', sets: 3, reps: '12-15', timer: '30', gif: '/images/cablelaterals.gif' }
    ]
  },
  {
    muscle: 'Core',
    image: '/assets/core.jpeg',
    exercises: [
      { name: 'Plank', sets: 3, reps: '—', timer: '60', gif: '/images/plank.gif' },
      { name: 'Crunches', sets: 4, reps: '15', timer: '30', gif: '/images/crunches.gif' },
      { name: 'Russian Twists', sets: 3, reps: '20 total', timer: '30', gif: '/images/russiantwists.gif' },
      { name: 'Leg Raises', sets: 3, reps: '12-15', timer: '30', gif: '/images/legraises.gif' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 total', timer: '30', gif: '/images/mountainclimbers.gif' },
      { name: 'Dead Bug', sets: 3, reps: '10 each side', timer: '30', gif: '/images/deadbug.gif' },
      { name: 'Ab Wheel Rollout', sets: 3, reps: '10-12', timer: '30', gif: '/images/abwheel.gif' },
      { name: 'Bicycle Crunches', sets: 3, reps: '20 total', timer: '30', gif: '/images/bicyclecrunches.gif' },
      { name: 'Side Planks', sets: 3, reps: '30s each side', timer: '30', gif: '/images/sideplanks.gif' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '10-12', timer: '30', gif: '/images/hanginglegraises.gif' }
    ]
  }
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
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wide ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
      >
        Begin Your Epic Fitness Journey
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
                className="cursor-pointer bg-white border border-black/20 text-gray-800 rounded-xl p-5 shadow-md hover:shadow-yellow-400 transition duration-300"
              >
                <img src={`/assets/${ex.name}.jpeg`} alt={ex.name} className="w-full h-50 object-cover rounded mb-4" />
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
                Reps: <span className="font-semibold">{selectedExercise.reps}</span>
              </p>
            )}
            {selectedExercise.sets && (
              <p>
                Sets: <span className="font-semibold">{selectedExercise.sets}</span>
              </p>
            )}
            {selectedExercise.timer && (
              <p>
                Timer: <span className="font-semibold">{timerSeconds}s</span>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FitnessGuide;
