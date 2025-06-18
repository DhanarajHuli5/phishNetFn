import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import { apiService } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await apiService.forgotPassword(email);
      setSent(true);
      setMessage('Password reset link sent to your email');
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!sent ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {message && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {message}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <p className="text-green-700 font-medium">
                  {message}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Check your email for the password reset link. It may take a few minutes to arrive.
              </p>
            </div>
          )}

          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;