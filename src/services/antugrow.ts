import axios from 'axios';

const API_URL = process.env.ANTUGROW_API_URL || 'https://api.antugrow.com/v1';

export interface AntugrowData {
    ndvi: number;
    mi: number;
    ndmi: number;
}

export const fetchAntugrowData = async (lat: number, lng: number): Promise<AntugrowData> => {
    try {
        // Assuming the API accepts lat/lng as query params
        const response = await axios.get(`${API_URL}`, {
            params: { lat, lng }
        });

        // Mocking response if API is not actually reachable yet or returns different structure
        // Adjust based on actual API response
        return {
            ndvi: response.data.ndvi || 0,
            mi: response.data.mi || 0,
            ndmi: response.data.ndmi || 0
        };
    } catch (error) {
        console.error('Error fetching Antugrow data:', error);
        // Return safe defaults or rethrow
        return { ndvi: 0, mi: 0, ndmi: 0 };
    }
};
