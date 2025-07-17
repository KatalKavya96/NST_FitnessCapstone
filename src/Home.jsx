import React, { useEffect, useState } from 'react';
import StatCard from '../src/components/StatCard';
import ChallengeHighlight from '../src/components/Highlight';
import ProgressBar from '../src/components/Bar';
import ExerciseVideoSection from '../src/components/ExerciseVideoSection';
import ExerciseGuide from '../src/components/ExerciseGuide';
import NutritionGuide from '../src/components/NutritionGuide';
import QuoteBanner from '../src/components/QuoteBanner';
// import api methods if needed here

const Home = () => {
  const [stats, setStats] = useState([
    { label: 'Steps Today', value: '5,230' },
    { label: 'Calories Burned', value: '372 kcal' },
    { label: 'Streak', value: '7 Days' },
  ]);
  const [challenge, setChallenge] = useState({
    title: '50 Pushups + 2km Walk',
    link: '/challenges'
  });
  const [progress, setProgress] = useState({ current: 3, total: 5 });

  return (
    <div className="min-h-screen bg-white text-gray-900 px-4 py-6 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Champion!</h1>
      <p className="text-sm md:text-base text-gray-500 mb-8">
        “Push yourself, because no one else is going to do it for you.”
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {stats.map((s, i) => (
          <StatCard key={i} label={s.label} value={s.value} />
        ))}
      </div>

      <ChallengeHighlight title={challenge.title} link={challenge.link} />
      <ProgressBar current={progress.current} total={progress.total} />

      <ExerciseVideoSection />
      <ExerciseGuide />
      <NutritionGuide />
      <QuoteBanner />
    </div>
  );
};

export default Home;
