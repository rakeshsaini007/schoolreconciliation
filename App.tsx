import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { SchoolTable } from './components/SchoolTable';
import { RemainingSchoolButton } from './components/RemainingSchoolButton';
import { fetchRemainingSchools } from './services/api';
import { School } from './types';
import { RefreshCw, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRemainingSchools();
      setSchools(data);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Google Sheets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-slate-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Controls Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Pending Submissions</h2>
            <p className="text-gray-500 text-sm mt-1">
              List of schools present in "SchoolList" but missing from "Data".
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={loadData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
            
            <RemainingSchoolButton schools={schools} disabled={loading} />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start space-x-3 rounded-r">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-700">Error Loading Data</h3>
              <p className="text-red-600 text-sm">{error}</p>
              <p className="text-red-600 text-xs mt-2">
                Make sure you have deployed the Google Apps Script as a Web App with access set to "Anyone".
              </p>
            </div>
          </div>
        )}

        {/* Data Table */}
        <SchoolTable schools={schools} isLoading={loading} />

      </main>

      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} School Data Management.
        </div>
      </footer>
    </div>
  );
};

export default App;