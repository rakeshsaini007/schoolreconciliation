import { ApiResponse, School } from '../types';

// IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwFky2hI1a1i1Ygg1CH9e0p7DJ0twg-Iwg2bv5QLnHj4yK-_W8VT6u5QMuo1J33Bz5bYA/exec';

export const fetchRemainingSchools = async (): Promise<School[]> => {
  try {
    // We append a timestamp to avoid browser caching issues with GET requests
    const response = await fetch(`${GAS_WEB_APP_URL}?t=${new Date().getTime()}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const json: ApiResponse = await response.json();

    if (json.status === 'error') {
      throw new Error(json.message || 'Unknown error from server');
    }

    return json.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};