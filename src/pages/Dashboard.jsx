import React, { useState } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, ExternalLink, History } from 'lucide-react';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanHistory, setScanHistory] = useState([
    {
      id: 1,
      url: 'https://example-safe-site.com',
      status: 'safe',
      timestamp: '2025-01-21T10:30:00Z',
      risk_score: 0.1
    },
    {
      id: 2,
      url: 'https://suspicious-site.net',
      status: 'suspicious',
      timestamp: '2025-01-21T09:15:00Z',
      risk_score: 0.8
    }
  ]);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    
    // Simulate API call for URL scanning
    setTimeout(() => {
      const mockResult = {
        url: url,
        status: Math.random() > 0.7 ? 'suspicious' : 'safe',
        risk_score: Math.random(),
        details: {
          domain_age: Math.floor(Math.random() * 3650),
          ssl_certificate: Math.random() > 0.3,
          reputation_score: Math.random(),
          blacklist_status: Math.random() > 0.8 ? 'listed' : 'clean'
        }
      };
      
      setResult(mockResult);
      setScanHistory(prev => [
        {
          id: Date.now(),
          url: mockResult.url,
          status: mockResult.status,
          timestamp: new Date().toISOString(),
          risk_score: mockResult.risk_score
        },
        ...prev.slice(0, 9)
      ]);
      setLoading(false);
    }, 2000);
  };

  const getRiskColor = (status, score) => {
    if (status === 'suspicious' || score > 0.7) return 'text-red-600';
    if (score > 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getRiskBgColor = (status, score) => {
    if (status === 'suspicious' || score > 0.7) return 'bg-red-50 border-red-200';
    if (score > 0.4) return 'bg-yellow-50 border-yellow-200';
    return 'bg-green-50 border-green-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Scanner Dashboard</h1>
          <p className="text-gray-600">Analyze URLs for potential phishing threats and security risks</p>
        </div>

        {/* URL Scanner */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">URL Security Scanner</h2>
          </div>

          <form onSubmit={handleScan} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter URL to scan (e.g., https://example.com)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Scan URL</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Scan Result */}
          {result && (
            <div className={`mt-6 p-6 rounded-xl border-2 ${getRiskBgColor(result.status, result.risk_score)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {result.status === 'safe' ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  )}
                  <div>
                    <h3 className={`text-lg font-semibold ${getRiskColor(result.status, result.risk_score)}`}>
                      {result.status === 'safe' ? 'URL appears safe' : 'Potential threat detected'}
                    </h3>
                    <p className="text-sm text-gray-600">Risk Score: {(result.risk_score * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>

              <div className="bg-white rounded-lg p-4 space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Domain Age:</span>
                    <span className="ml-2 font-medium">{result.details.domain_age} days</span>
                  </div>
                  <div>
                    <span className="text-gray-500">SSL Certificate:</span>
                    <span className={`ml-2 font-medium ${result.details.ssl_certificate ? 'text-green-600' : 'text-red-600'}`}>
                      {result.details.ssl_certificate ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Reputation:</span>
                    <span className="ml-2 font-medium">{(result.details.reputation_score * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Blacklist Status:</span>
                    <span className={`ml-2 font-medium ${result.details.blacklist_status === 'clean' ? 'text-green-600' : 'text-red-600'}`}>
                      {result.details.blacklist_status === 'clean' ? 'Clean' : 'Listed'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scan History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <History className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Scans</h2>
          </div>

          <div className="space-y-3">
            {scanHistory.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  {scan.status === 'safe' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{scan.url}</p>
                    <p className="text-sm text-gray-500">
                      Risk: {(scan.risk_score * 100).toFixed(1)}% • 
                      {new Date(scan.timestamp).toLocaleDateString()} {new Date(scan.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  scan.status === 'safe' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {scan.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;