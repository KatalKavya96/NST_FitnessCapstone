const ExerciseVideoSection = () => {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Featured Workout Video</h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.youtube.com/embed/UBMk30rjy0o"
            title="Workout Tutorial"
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  };
  
  export default ExerciseVideoSection;
  