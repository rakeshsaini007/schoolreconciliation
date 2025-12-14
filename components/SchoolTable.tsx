import React from 'react';
import { School } from '../types';

interface SchoolTableProps {
  schools: School[];
  isLoading: boolean;
}

export const SchoolTable: React.FC<SchoolTableProps> = ({ schools, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
        <p className="text-gray-500 text-lg">No pending schools found. All clear!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Udise Code
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              School Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nyay Panchayat
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {schools.map((school, index) => (
            <tr key={`${school.udiseCode}-${index}`} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {school.udiseCode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {school.schoolName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {school.nyayPanchayat}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {school.schoolType}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};