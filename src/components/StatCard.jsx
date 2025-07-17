const StatCard = ({ label, value }) => (
    <div className="bg-gray-100 p-4 rounded-xl shadow text-center">
      <p className="text-md font-medium text-gray-700">{label}</p>
      <h2 className="text-2xl font-bold text-blue-600 mt-2">{value}</h2>
    </div>
  );
  
  export default StatCard;
  