import React from 'react';
import { School as SchoolIcon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SchoolIcon className="h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">School Reconciliation</h1>
            <p className="text-indigo-200 text-sm">Track pending school submissions</p>
          </div>
        </div>
      </div>
    </header>
  );
};