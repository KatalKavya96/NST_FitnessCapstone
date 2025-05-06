import React from 'react'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-6 md:px-12">
        <div className="mb-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">Welcome back, Champion!</h1>
          <p className="text-sm md:text-base text-gray-400 mt-2">
            “Push yourself, because no one else is going to do it for you.”
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-4 rounded-xl shadow-md text-center">
            <p className="text-lg font-semibold">Steps Today</p>
            <h2 className="text-3xl font-bold mt-2">5,230</h2>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-md text-center">
            <p className="text-lg font-semibold">Calories Burned</p>
            <h2 className="text-3xl font-bold mt-2">372 kcal</h2>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-md text-center">
            <p className="text-lg font-semibold">Streak</p>
            <h2 className="text-3xl font-bold mt-2">7 Days</h2>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-lg text-center md:text-left">
          <p className="text-lg font-medium">Today’s Challenge</p>
          <h2 className="text-2xl font-bold mt-2 mb-4">50 Pushups + 2km Walk</h2>
          <Link to="/challenges">
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-full text-white font-semibold transition">
              Start Challenge →
            </button>
          </Link>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <p className="text-lg font-semibold mb-2">Progress Overview</p>
          <div className="w-full bg-gray-700 h-4 rounded-full">
            <div className="bg-green-500 h-4 rounded-full w-[60%] transition-all duration-500"></div>
          </div>
          <p className="text-sm mt-2 text-gray-300">3 of 5 challenges completed today</p>
        </div>
      </div>
    </>
  )
}

export default Home
