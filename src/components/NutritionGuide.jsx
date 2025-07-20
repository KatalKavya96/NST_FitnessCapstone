import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

const nutritionPlans = [
  {
    type: 'Body Type Healthy',
    image: '/images/nutrition/healthy.jpg',
    icon: '🥗',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'Balanced Plate',
        description: 'Includes fruits, veggies, grains, and protein.',
        veg: true,
        nonVeg: true,
        icon: '🍽️',
        recipes: [
          'Quinoa Buddha Bowl with roasted vegetables and chickpeas',
          'Mediterranean salad with feta, olives, and whole grain pita',
          'Stir-fried brown rice with mixed vegetables and tofu',
          'Grilled chicken breast with sweet potato and steamed broccoli',
          'Baked salmon with quinoa and roasted asparagus'
        ]
      },
      {
        name: 'Low Carb',
        description: 'Focus on proteins and fats, limit carbs.',
        veg: true,
        nonVeg: true,
        icon: '🥑',
        recipes: [
          'Cauliflower rice stir-fry with tofu and vegetables',
          'Zucchini noodles with avocado pesto',
          'Grilled portobello mushroom steaks',
          'Baked chicken with zucchini noodles',
          'Pan-seared salmon with cauliflower mash'
        ]
      }
    ]
  },
  {
    type: 'Bulk (Muscle Gain)',
    image: '/images/nutrition/bulk.jpg',
    icon: '💪',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'High Protein Veg',
        description: 'Paneer, lentils, tofu, quinoa based meals.',
        veg: true,
        icon: '🫘',
        recipes: [
          'Paneer tikka with quinoa and mixed vegetables',
          'Lentil and chickpea curry with brown rice',
          'Tofu scramble with whole grain toast and avocado',
          'Protein smoothie bowl with nuts and seeds',
          'Tempeh stir-fry with brown rice and edamame'
        ]
      },
      {
        name: 'High Protein Non-Veg',
        description: 'Chicken breast, eggs, fish with rice.',
        nonVeg: true,
        icon: '🍗',
        recipes: [
          'Grilled chicken breast with sweet potato and quinoa',
          'Egg white omelette with whole grain toast',
          'Baked salmon with brown rice and vegetables',
          'Turkey and quinoa stuffed bell peppers',
          'Tuna steak with avocado and brown rice'
        ]
      }
    ]
  },
  {
    type: 'Cut (Fat Loss)',
    image: '/images/nutrition/cut.jpg',
    icon: '⚡',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'Calorie Deficit Veg',
        description: 'Salads, lentils, steamed veggies.',
        veg: true,
        icon: '🥗',
        recipes: [
          'Mixed green salad with grilled tofu and light dressing',
          'Steamed vegetables with quinoa and hummus',
          'Lentil soup with whole grain crackers',
          'Roasted vegetable and chickpea bowl',
          'Spinach and mushroom stir-fry with cauliflower rice'
        ]
      },
      {
        name: 'Calorie Deficit Non-Veg',
        description: 'Grilled chicken, egg whites, broccoli.',
        nonVeg: true,
        icon: '🥦',
        recipes: [
          'Grilled chicken breast with steamed broccoli',
          'Egg white scramble with spinach and mushrooms',
          'Baked fish with roasted vegetables',
          'Turkey and vegetable soup',
          'Shrimp stir-fry with cauliflower rice'
        ]
      }
    ]
  },
  {
    type: 'Gym Routine Diet',
    image: '/images/nutrition/gym.jpg',
    icon: '🏋️‍♂️',
    vegetarian: true,
    nonVegetarian: true,
    plans: [
      {
        name: 'Pre/Post Workout Veg',
        description: 'Banana, oats, peanut butter, curd.',
        veg: true,
        icon: '🍌',
        recipes: [
          'Overnight oats with banana and peanut butter',
          'Greek yogurt parfait with granola and berries',
          'Protein smoothie with plant milk and fruits',
          'Whole grain toast with almond butter and banana',
          'Chickpea and quinoa power bowl'
        ]
      },
      {
        name: 'Pre/Post Workout Non-Veg',
        description: 'Egg whites, whey protein, chicken wrap.',
        nonVeg: true,
        icon: '🥚',
        recipes: [
          'Egg white and oatmeal protein pancakes',
          'Grilled chicken wrap with hummus',
          'Whey protein smoothie with banana and oats',
          'Turkey and avocado roll-ups',
          'Tuna salad with whole grain crackers'
        ]
      }
    ]
  }
];

const NutritionGuide = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [filter, setFilter] = useState('all');
  const { isDarkMode } = useTheme();

  const filteredPlans = (plans) => {
    return plans.filter((plan) => {
      if (filter === 'veg') return plan.veg;
      if (filter === 'nonveg') return plan.nonVeg;
      return true;
    });
  };

  return (
    <div className={`min-h-screen px-6 py-12 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-yellow-50 to-orange-50 text-gray-800'}`}>
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🥗</span>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Personalized Nutrition Guide
          </h2>
        </div>
        <div className={`rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={`px-4 py-2 pr-8 ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} border-none outline-none cursor-pointer`}
          >
            <option value="all">All Plans</option>
            <option value="veg">Vegetarian</option>
            <option value="nonveg">Non-Vegetarian</option>
          </select>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedType ? (
          <div
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {nutritionPlans.map((plan, i) => (
              <div
                key={i}
                onClick={() => setSelectedType(plan)}
                className={`cursor-pointer rounded-2xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={plan.image} alt={plan.type} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-black' : 'bg-yellow-500'} bg-opacity-20`} />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl">
                    {plan.icon}
                  </div>
                </div>
                <div className={`p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.type}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {`${plan.plans.length} meal plans available`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div key="details">
            <button
              onClick={() => setSelectedType(null)}
              className={`mb-8 px-6 py-3 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-full shadow-lg flex items-center gap-2 transition-colors`}
            >
              ←
              <span className="font-semibold">Back to Nutrition Types</span>
            </button>

            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              {selectedType.icon} {selectedType.type} Plans
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans(selectedType.plans).map((item, idx) => (
                <div
                  key={idx}
                  className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-yellow-200'} p-6 rounded-2xl shadow-lg border-2 transition-all hover:scale-[1.03] hover:-translate-y-1`}
                >
                  <div className="text-3xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-bold mb-3">{item.name}</h4>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    {item.description}
                  </p>
                  <div className="mb-4 flex gap-2">
                    {item.veg && (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                        Veg
                      </span>
                    )}
                    {item.nonVeg && (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                        Non-Veg
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold mb-2">Recommended Recipes:</h5>
                    <ul className="space-y-2">
                      {item.recipes.map((recipe, recipeIdx) => (
                        <li
                          key={recipeIdx}
                          className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}
                        >
                          <span className="text-yellow-500">•</span>
                          {recipe}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NutritionGuide;
