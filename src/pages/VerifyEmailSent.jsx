import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowLeft } from 'lucide-react';

const VerifyEmailSent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Check Your Email
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="space-y-6">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verification Email Sent
              </h3>
              <p className="text-gray-600 mb-4">
                We've sent a verification link to your email address. Click the link in the email to verify your account.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                <p>
                  <strong>Didn't receive the email?</strong> Check your spam folder or try registering again.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Go to Login
              </Link>
              
              <div className="text-center">
                <Link
                  to="/register"
                  className="flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-500 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Registration</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSent;