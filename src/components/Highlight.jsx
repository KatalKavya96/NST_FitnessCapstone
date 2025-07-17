import { Link } from 'react-router-dom';

const ChallengeHighlight = ({ title, link }) => (
  <div className="bg-blue-50 p-6 rounded-xl mb-8 shadow text-center md:text-left">
    <p className="text-lg font-medium text-blue-800">Today’s Challenge</p>
    <h2 className="text-2xl font-bold mt-2 mb-4 text-gray-900">{title}</h2>
    <Link to={link}>
      <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-white font-semibold transition">
        Start Challenge →
      </button>
    </Link>
  </div>
);

export default ChallengeHighlight;
