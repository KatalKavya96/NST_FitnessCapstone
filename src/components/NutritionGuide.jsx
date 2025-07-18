import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nutritionPlans = [
  {
    type: 'Body Type Healthy',
    image: '/images/nutrition/healthy.jpg',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'Balanced Plate',
        description: 'Includes fruits, veggies, grains, and protein.',
        veg: true,
        nonVeg: true
      },
      {
        name: 'Low Carb',
        description: 'Focus on proteins and fats, limit carbs.',
        veg: true,
        nonVeg: true
      }
    ]
  },
  {
    type: 'Bulk (Muscle Gain)',
    image: '/images/nutrition/bulk.jpg',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'High Protein Veg',
        description: 'Paneer, lentils, tofu, quinoa based meals.',
        veg: true
      },
      {
        name: 'High Protein Non-Veg',
        description: 'Chicken breast, eggs, fish with rice.',
        nonVeg: true
      }
    ]
  },
  {
    type: 'Cut (Fat Loss)',
    image: '/images/nutrition/cut.jpg',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'Calorie Deficit Veg',
        description: 'Salads, lentils, steamed veggies.',
        veg: true
      },
      {
        name: 'Calorie Deficit Non-Veg',
        description: 'Grilled chicken, egg whites, broccoli.',
        nonVeg: true
      }
    ]
  },
  {
    type: 'Gym Routine Diet',
    image: '/images/nutrition/gym.jpg',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'Pre/Post Workout Veg',
        description: 'Banana, oats, peanut butter, curd.',
        veg: true
      },
      {
        name: 'Pre/Post Workout Non-Veg',
        description: 'Egg whites, whey protein, chicken wrap.',
        nonVeg: true
      }
    ]
  }
];

const NutritionGuide = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredPlans = (plans) => {
    return plans.filter((plan) => {
      if (filter === 'veg') return plan.veg;
      if (filter === 'nonveg') return plan.nonVeg;
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">🥗 Personalized Nutrition Guide</h2>
        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      {!selectedType && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nutritionPlans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedType(plan)}
              className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-lg border"
            >
              <img src={plan.image} alt={plan.type} className="w-full h-40 object-cover" />
              <div className="p-4 bg-yellow-100">
                <h3 className="text-lg font-bold text-yellow-800 text-center">{plan.type}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedType && (
        <div>
          <button
            onClick={() => setSelectedType(null)}
            className="mb-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full text-black font-semibold"
          >
            ← Back to Nutrition Types
          </button>
          <h3 className="text-2xl font-bold mb-4">🍴 {selectedType.type} Plans</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPlans(selectedType.plans).map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="bg-white border border-yellow-300 p-4 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <h4 className="font-bold text-yellow-700 mb-2">{item.name}</h4>
                <p className="text-sm text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionGuide;
