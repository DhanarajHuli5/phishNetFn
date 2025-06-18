import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Eye, Users, ArrowRight, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Protect Yourself from
              <span className="text-blue-600 block">Phishing Attacks</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Advanced URL analysis powered by machine learning to detect malicious websites
              before they can harm you. Stay safe online with real-time threat detection.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-gray-700 font-medium">99.9% Accuracy</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-700 font-medium">Real-time Analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-gray-700 font-medium">100K+ Users Protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Protection Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive security tools designed to keep you safe from online threats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">URL Scanning</h3>
              <p className="text-gray-600 leading-relaxed">
                Instantly analyze any URL for potential phishing threats using advanced machine learning algorithms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Monitoring</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous monitoring of your browsing activity with instant alerts for suspicious websites.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instant Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Get immediate feedback on URL safety with detailed risk assessment reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Online Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust PhishGuard to protect them from online threats.
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center space-x-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;