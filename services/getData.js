/**
 * Fetch data from the backend API
 * @param {string} endpoint - API endpoint (default: 'get')
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} - API response data
 */
export const getData = async (endpoint = 'get', params = {}) => {
    try {
        // Build the URL with query parameters
        const baseUrl = process.env.NEXT_PUBLIC_BASEURL || '';
        let url = `${baseUrl}/api/v1/${endpoint}`;
        
        // Add query parameters if provided
        if (Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            url = `${url}?${queryString}`;
        }
        
        // Make the API request
        const response = await fetch(url);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        // Parse and return the JSON response
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}