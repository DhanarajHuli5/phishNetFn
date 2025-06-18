import React, { useState } from 'react';
import { User, Mail, Shield, Key, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await apiService.changePassword(passwordData.oldPassword, passwordData.newPassword);
      setMessage('Password updated successfully');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      await apiService.resendEmailVerification();
      setMessage('Verification email sent');
    } catch (error) {
      setMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'profile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'security'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('success') 
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user?.username || 'User'}
                    </h3>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={user?.username || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={user?.email || ''}
                        readOnly
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                      {!user?.emailVerified && (
                        <button
                          onClick={handleResendVerification}
                          disabled={loading}
                          className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                    {!user?.emailVerified && (
                      <p className="text-sm text-yellow-600 mt-1">Email not verified</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Status
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                    <span className="text-sm text-gray-500">
                      Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>Change Password</span>
                  </h3>
                  
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) => setPasswordData({
                          ...passwordData,
                          oldPassword: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Update Password</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                        Enable
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Login Notifications</p>
                        <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                      </div>
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Enabled
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;