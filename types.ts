export interface School {
  udiseCode: string;
  schoolName: string;
  nyayPanchayat: string;
  schoolType: string;
}

export interface ApiResponse {
  status: 'success' | 'error';
  data: School[];
  message?: string;
}
