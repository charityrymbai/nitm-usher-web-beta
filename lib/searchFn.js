const fetchFromBackend = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

/**
 * Search for places by name
 * @param {string} query - The search query
 * @returns {Promise<Array>} - Array of matching places with basic info
 */
export async function searchPlaces(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }
  
  // Use the backend API to search for places
  // This is more efficient than fetching all data and filtering on the client
  const searchUrl = `${process.env.NEXT_PUBLIC_BASEURL || ''}/api/v1/get?place_name=${encodeURIComponent(query)}`;
  const data = await fetchFromBackend(searchUrl);
  
  if (!data || !data.records) {
    return [];
  }
  
  // Map the backend data to the format expected by the frontend
  return data.records.map(place => ({
    id: place.id,
    name: place.place_name,
    office: `${place.block}${place.floor}${place.room_no || ''}`,
    location: `${place.room_no || 'Room'} on Floor ${place.floor} of Block ${place.block}`,
  })).slice(0, 7); 
}

/**
 * Get place details by ID
 * @param {string|number} id - The place ID
 * @returns {Promise<Object|null>} - Place details or null if not found
 */
export async function getPlaceById(id) {
  if (!id) {
    return null;
  }
  
  // Fetch place details from the backend
  const detailUrl = `${process.env.NEXT_PUBLIC_BASEURL || ''}/api/v1/get/${id}`;
  const data = await fetchFromBackend(detailUrl);
  
  if (!data || !data.record) {
    return null;
  }
  
  const place = data.record;
  
  // Map the backend data to the format expected by the frontend
  return {
    id: place.id,
    name: place.place_name,
    office: `${place.block}${place.floor}${place.room_no || ''}`,
    location: `${place.room_no || 'Room'} on Floor ${place.floor} of Block ${place.block}`,
    block: place.block,
    floor: place.floor,
    room_no: place.room_no || ''
  };
}

// For backward compatibility
export const searchProfessors = searchPlaces;
export const searchById = getPlaceById;

