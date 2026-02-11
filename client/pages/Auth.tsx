import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../src/services/api';
import { useToast } from '../components/ToastContext';
import { useAuth } from '../components/AuthContext';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (isLogin) {
        response = await authService.login({ email: formData.email, password: formData.password });
      } else {
        response = await authService.register(formData);
      }

      // Use AuthContext login instead of manually writing to localStorage
      login(response.data, response.data.token);

      addToast(isLogin ? 'Login successful!' : 'Account created successfully!', 'success');
      navigate('/');
    } catch (error: any) {
      addToast(error.response?.data?.message || 'Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

      <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 w-full max-w-md shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-slate-400">
            {isLogin ? 'Enter your details to access your account' : 'Join the community of developers and designers'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-slate-400 text-sm mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors pl-11 placeholder-slate-600"
                  placeholder="John Doe"
                  required={!isLogin}
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 text-sm mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors pl-11 placeholder-slate-600"
                placeholder="name@example.com"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors pl-11 pr-11 placeholder-slate-600"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-blue-500 focus:ring-offset-slate-800 cursor-pointer" />
              <span className="text-slate-400 text-sm group-hover:text-slate-300">Remember me</span>
            </label>
            {isLogin && (
              <button type="button" className="text-sm text-blue-400 hover:underline hover:text-blue-300">Forgot password?</button>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a3e635] hover:bg-[#bef264] text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-700"></div>
              <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">OR</span>
              <div className="flex-grow border-t border-slate-700"></div>
            </div>

            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="w-full bg-slate-700/50 hover:bg-slate-700 text-blue-400 font-bold py-3.5 rounded-xl transition-all border border-slate-600 hover:border-slate-500"
            >
              {isLogin ? 'Create an Account' : 'Back to Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};