import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Home';
import Challenges from './Challenges';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import EditProfile from './EditProfile';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import PublicProfile from "./PublicProfile";
import FitnessGuide from './components/FitnessGuide';
import ExerciseVideos from './components/ExerciseVideoSection';
import NutritionGuide from './components/NutritionGuide';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/:uid" element={<PublicProfile />} />
          <Route path="/fitness-guide" element={<FitnessGuide />} />
          <Route path="/exercise-videos" element={<ExerciseVideos />} />
          <Route path="/nutrition-guide" element={<NutritionGuide />} />



        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
