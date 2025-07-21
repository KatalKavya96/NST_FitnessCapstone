import React from 'react';
import { ChallengesProvider } from './Challenges';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './Home';
import Challenges from './Challenges';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import EditProfile from './EditProfile';
import { AuthProvider } from './components/AuthContext';
import { ThemeProvider } from './components/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import PublicProfile from './PublicProfile';
import FitnessGuide from './components/FitnessGuide';
import ExerciseVideos from './components/ExerciseVideoSection';
import NutritionGuide from './components/NutritionGuide';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ChallengesProvider>
            <div className="relative min-h-screen">
              <Navbar />
              <Layout>
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
                  <Route path="/user/:uid" element={<PublicProfile />} />
                  <Route
                    path="/fitness-guide"
                    element={
                      <ProtectedRoute>
                        <FitnessGuide />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/exercise-videos"
                    element={
                      <ProtectedRoute>
                        <ExerciseVideos />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/nutrition-guide"
                    element={
                      <ProtectedRoute>
                        <NutritionGuide />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </div>
          </ChallengesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
