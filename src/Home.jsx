import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../src/components/StatCard';
import ChallengeHighlight from '../src/components/Highlight';
import ProgressBar from '../src/components/Bar';
import ExerciseVideoSection from '../src/components/ExerciseVideoSection';
import NutritionGuide from '../src/components/NutritionGuide';
import QuoteBanner from '../src/components/QuoteBanner';
import { useAuth } from './useAuth'; 
import ExercisePreview from './components/ExercisePreview';
import FitnessGuide from './components/FitnessGuide';
import ExerciseVideoPreview from './components/ExerciseVideoPreview';
import { useTheme } from './components/ThemeContext';
import { useChallenges } from './Challenges';

const Home = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { challenges } = useChallenges();
  const [randomChallenge, setRandomChallenge] = useState(null);

  useEffect(() => {
    const updateUser = async () => {
      if (!user?.uid) return;

      try {
        const res = await fetch('http://localhost:5000/api/users/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName || 'New User',
            email: user.email || '',
            profilePhoto: user.photoURL || '',
            joinedAt: new Date().toISOString(),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error('Update failed:', data.error);
        } else {
          console.log('User synced on home load');
        }
      } catch (err) {
        console.error('Failed to update user:', err);
      }
    };

    updateUser();
  }, [user]);

  useEffect(() => {

    const uncompletedChallenges = challenges.filter(c => !c.completed);
    if (uncompletedChallenges.length > 0) {
      const randomIndex = Math.floor(Math.random() * uncompletedChallenges.length);
      setRandomChallenge(uncompletedChallenges[randomIndex]);
    } else {
      setRandomChallenge(null);
    }
  }, [challenges]);

  const stats = [
    { label: 'Steps Today', value: '5,230' },
    { label: 'Calories Burned', value: '372 kcal' },
    { label: 'Streak', value: '7 Days' },
  ];

  const completedChallenges = challenges.filter(c => c.completed).length;
  const totalChallenges = challenges.length;

  const handleNutritionCardClick = (type) => {
    navigate('/nutrition-guide', { state: { selectedType: type } });
  };

  const handleFitnessCardClick = () => {
    navigate('/fitness-guide');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} px-4 py-6 md:px-12 transition-colors duration-200`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Champion!</h1>
      <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-8`}>
        "Push yourself, because no one else is going to do it for you."
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((s, i) => (
          <StatCard key={i} label={s.label} value={s.value} />
        ))}
      </div>

      {randomChallenge && (
        <ChallengeHighlight 
          title={randomChallenge.title} 
          description={randomChallenge.description}
          points={randomChallenge.points}
          type={randomChallenge.type}
          link="/challenges" 
        />
      )}

      <div className="my-8">
        <ProgressBar current={completedChallenges} total={totalChallenges} />
      </div>

      <ExerciseVideoPreview/>

      <section 
        onClick={handleFitnessCardClick}
        className={`my-12 px-4 py-10 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'} rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Your Ultimate Fitness Guide</h2>
          <p className={`text-md md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore exercises for each muscle group, with detailed reps, sets, and animations. Start your journey towards a stronger you.
          </p>
        </div>
        <ExercisePreview/>
      </section>

      <section className={`my-12 px-4 py-10 ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'} rounded-xl shadow-md transition-colors duration-200`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Your Personal Nutrition Guide
          </h2>
          <p className={`text-md md:text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
            Explore diet plans tailored to your goals — whether it's gaining mass, getting lean, or staying healthy. Vegetarian and Non-Vegetarian options included!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { type: 'Healthy', emoji: '', color: isDarkMode ? 'from-green-700 to-green-900' : 'from-green-300 to-green-500', description: 'Balanced nutrition for overall wellness' },
            { type: 'Bulk', emoji: '', color: isDarkMode ? 'from-yellow-700 to-orange-900' : 'from-yellow-300 to-orange-400', description: 'High-protein plans for muscle gain' },
            { type: 'Cut', emoji: '', color: isDarkMode ? 'from-pink-700 to-red-900' : 'from-pink-300 to-red-400', description: 'Lean meals for fat loss' },
            { type: 'Gym', emoji: '', color: isDarkMode ? 'from-blue-700 to-blue-900' : 'from-blue-300 to-blue-500', description: 'Pre and post workout nutrition' }
          ].map((plan, i) => (
            <div
              key={i}
              onClick={() => handleNutritionCardClick(plan.type)}
              className={`p-6 rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group`}
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{plan.emoji}</div>
              <h3 className="text-xl font-bold mb-2">{plan.type} Plan</h3>
              <p className="text-sm opacity-90">{plan.description}</p>
            </div>
          ))}
        </div>
      </section>
      <QuoteBanner />
    </div>
  );
};

export default Home;
