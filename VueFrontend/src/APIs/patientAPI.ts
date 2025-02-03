const BASE_URL = 'http://localhost:5000/api/patients';

export const fetchPatientReports = async (searchTerm?: string): Promise<string[]> => {
  try {
    const url = new URL(`${BASE_URL}/reports`);
    if (searchTerm) {
      url.searchParams.append('search', searchTerm);
    }

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient reports:', error);
    return [];
  }
};