import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Mail } from 'lucide-react';
import { apiService } from '../services/api';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await apiService.verifyEmail(token);
        setStatus('success');
        setMessage('Your email has been successfully verified!');
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Email Verification
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Verifying your email...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification Successful!</h3>
                <p className="text-gray-600 mb-6">{message}</p>
              </div>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Continue to Login
              </Link>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification Failed</h3>
                <p className="text-gray-600 mb-6">{message}</p>
              </div>
              <div className="space-y-3">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Register Again
                </Link>
                <p className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-500">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;