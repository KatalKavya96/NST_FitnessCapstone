const ProgressBar = ({ completed, total }) => {
    const percent = total > 0 ? (completed / total) * 100 : 0;
  
    return (
      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <p className="text-lg font-semibold text-gray-700 mb-2">Progress Overview</p>
        <div className="w-full bg-gray-300 h-4 rounded-full">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm mt-2 text-gray-500">
          {completed} of {total} challenges completed ({Math.round(percent)}%)
        </p>
      </div>
    );
  };
  
  export default ProgressBar;
  