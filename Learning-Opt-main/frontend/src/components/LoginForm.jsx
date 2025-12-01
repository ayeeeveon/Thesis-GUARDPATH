import { useState } from 'react';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

export default function LoginForm({ isLoading, setIsLoading, onForgotPassword }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      triggerToast('Please fill in both fields.', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        triggerToast('Login successful!', 'success');
        setTimeout(() => {
          navigate('/home');
        }, 1200);
      } else {
        triggerToast(result.message || 'Invalid username or password.', 'error');
      }
    } catch (err) {
      triggerToast(`Network error: ${err.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerToast = (message, type = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 w-full">

      {/* EMAIL FIELD */}
      <div>
        <label className="text-xs font-semibold text-gray-600">EMAIL</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          className="w-full mt-1 p-3 border border-green-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {/* PASSWORD FIELD */}
      <div>
        <label className="text-xs font-semibold text-gray-600">PASSWORD</label>
        <div className="relative mt-1">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'} // ✅ toggle type
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full p-3 pr-16 border border-green-700 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          {/* SHOW/HIDE BUTTON */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700 font-semibold text-sm hover:underline"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {/* FORGOT PASSWORD */}
      <div className="text-right">
        <button
          type="button"
          onClick={() => onForgotPassword && onForgotPassword()}
          className="text-green-700 text-sm hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* LOGIN BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-700 hover:bg-green-800 transition p-3 rounded-md text-white font-semibold"
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      {showToast && <Toast message={toastMessage} type={toastType} />}
    </form>
  );
}
