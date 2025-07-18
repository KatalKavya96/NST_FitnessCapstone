import React, { useEffect, useState } from 'react';
import StatCard from '../src/components/StatCard';
import ChallengeHighlight from '../src/components/Highlight';
import ProgressBar from '../src/components/Bar';
import ExerciseVideoSection from '../src/components/ExerciseVideoSection';
import NutritionGuide from '../src/components/NutritionGuide';
import QuoteBanner from '../src/components/QuoteBanner';
import { useAuth } from "./useAuth"; 
import ExercisePreview from './components/ExercisePreview';
import FitnessGuide from './components/FitnessGuide';
import ExerciseVideoPreview from './components/ExerciseVideoPreview';
// import api methods if needed here

const Home = () => {

  const { user } = useAuth();
  useEffect(() => {
    const updateUser = async () => {
      if (!user?.uid) return;

      try {
        const res = await fetch("http://localhost:5000/api/users/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName || "New User",
            email: user.email || "",
            profilePhoto: user.photoURL || "",
            joinedAt: new Date().toISOString(),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error("❌ Update failed:", data.error);
        } else {
          console.log("✅ User synced on home load");
        }
      } catch (err) {
        console.error("❌ Failed to update user:", err);
      }
    };

    updateUser();
  }, [user]);
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

      <ExerciseVideoPreview/>

      <section className="my-12 px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Your Ultimate Fitness Guide</h2>
          <p className="text-gray-700 text-md md:text-lg">
            Explore exercises for each muscle group, with detailed reps, sets, and animations. Start your journey towards a stronger you.
          </p>
        </div>
        <ExercisePreview/>
        <div className="text-center mt-8">
          <a
            href="/fitness-guide"
            className="inline-block px-6 py-2 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-full transition"
          >
            See Full Fitness Guide
          </a>
        </div>
      </section>
      <section className="my-12 px-4 py-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Your Personal Nutrition Guide
          </h2>
          <p className="text-gray-700 text-md md:text-lg max-w-3xl mx-auto">
            Explore diet plans tailored to your goals — whether it’s gaining mass, getting lean, or staying healthy. Vegetarian and Non-Vegetarian options included!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { type: "Healthy", emoji: "🍎", color: "from-green-300 to-green-500" },
            { type: "Bulk", emoji: "🍗", color: "from-yellow-300 to-orange-400" },
            { type: "Cut", emoji: "🥦", color: "from-pink-300 to-red-400" },
            { type: "Gym", emoji: "🍳", color: "from-blue-300 to-blue-500" }
          ].map((plan, i) => (
            <div
              key={i}
              className={`p-6 rounded-2xl bg-gradient-to-br ${plan.color} text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
            >
              <div className="text-4xl mb-2">{plan.emoji}</div>
              <h3 className="text-xl">{plan.type} Plan</h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/nutrition-guide"
            className="inline-block px-6 py-2 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full transition"
          >
            Explore Full Nutrition Guide
          </a>
        </div>
      </section>
      <QuoteBanner />
    </div>
  );
};

export default Home;
