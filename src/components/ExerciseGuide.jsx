const exercises = [
    { name: "Squats", type: "Legs", image: "/assets/exercises/squat.png" },
    { name: "Pushups", type: "Upper Body", image: "/assets/exercises/pushup.png" },
    { name: "Plank", type: "Core", image: "/assets/exercises/plank.png" },
  ];
  
  const ExerciseGuide = () => {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Exercise Guide</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {exercises.map((ex, idx) => (
            <div key={idx} className="bg-gray-100 p-4 rounded-xl shadow-md text-center">
              <img src={ex.image} alt={ex.name} className="w-24 h-24 mx-auto mb-2" />
              <h3 className="font-semibold">{ex.name}</h3>
              <p className="text-sm text-gray-500">{ex.type}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ExerciseGuide;
  