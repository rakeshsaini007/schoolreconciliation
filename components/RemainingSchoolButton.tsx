import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download, FileWarning } from 'lucide-react';
import { School } from '../types';

interface RemainingSchoolButtonProps {
  schools: School[];
  disabled: boolean;
}

export const RemainingSchoolButton: React.FC<RemainingSchoolButtonProps> = ({ schools, disabled }) => {
  
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Remaining Schools Report", 14, 22);
    
    // Subtitle / Date
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 30);
    doc.text(`Total Remaining: ${schools.length}`, 14, 36);

    // Table Data preparation
    const tableData = schools.map(s => [
      s.udiseCode,
      s.schoolName,
      s.nyayPanchayat,
      s.schoolType
    ]);

    // Generate Table
    autoTable(doc, {
      head: [['UDISE Code', 'School Name', 'Nyay Panchayat', 'School Type']],
      body: tableData,
      startY: 44,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }, // Indigo-600
      styles: { fontSize: 9 },
    });

    // Save File
    doc.save('remaining_schools_list.pdf');
  };

  return (
    <button
      onClick={generatePDF}
      disabled={disabled || schools.length === 0}
      className={`
        flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold shadow-md transition-all
        ${disabled || schools.length === 0
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg active:scale-95'
        }
      `}
    >
      {schools.length === 0 && !disabled ? (
        <FileWarning className="w-5 h-5" />
      ) : (
        <Download className="w-5 h-5" />
      )}
      <span>RemainingSchool (PDF)</span>
    </button>
  );
};