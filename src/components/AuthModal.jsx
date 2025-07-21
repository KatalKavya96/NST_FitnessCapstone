import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useTheme } from './ThemeContext';
import axios from 'axios';

const AuthModal = ({ isOpen, onClose, mode = 'signin', onModeChange }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (mode === 'signup') {
        res = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        res = await signInWithEmailAndPassword(auth, email, password);
      }
      const user = res.user;
      await axios.post('/api/users/sync', {
        uid: user.uid,
        name: mode === 'signup' ? name : user.displayName || 'Anonymous',
        email: user.email,
        avatarUrl: user.photoURL || '',
      });
      onClose();
      navigate('/');
    } catch (error) {
      setError(error.message.replace('Firebase: ', '').replace(/\([^)]*\)/, ''));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      await axios.post('/api/users/sync', {
        uid: user.uid,
        name: user.displayName || 'Anonymous',
        email: user.email,
        avatarUrl: user.photoURL || '',
      });
      onClose();
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const toggleMode = () => {
    setError('');
    setEmail('');
    setPassword('');
    setName('');
    onModeChange?.(mode === 'signup' ? 'signin' : 'signup');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className={`relative w-full max-w-md p-8 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-2xl ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {mode === 'signup' ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className={`flex-grow border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
          <span className={`mx-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>OR</span>
          <hr className={`flex-grow border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`} />
        </div>

        <button
          onClick={handleGoogleLogin}
          className={`w-full flex items-center justify-center py-2 rounded-lg border transition-colors duration-200 ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <p className={`text-center text-sm mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleMode}
            className="text-blue-600 font-medium hover:underline"
          >
            {mode === 'signup' ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;