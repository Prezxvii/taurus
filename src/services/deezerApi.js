// src/services/deezerApi.js
// No PROXY_URL needed here anymore! The React Dev Server handles it.

const fetchDeezer = async (endpoint) => {
    try {
        const response = await fetch(endpoint);

        console.log(`Fetching: ${endpoint}`);
        console.log(`Response Status for ${endpoint}: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error for ${endpoint}: ${response.status} - ${errorText}`);
            // Parse error JSON if available, otherwise use text
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(`HTTP error! Status: ${response.status} - ${errorJson.error?.message || errorText || response.statusText}`);
            } catch (e) {
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText || response.statusText}`);
            }
        }
        const data = await response.json();
        console.log(`Data for ${endpoint}:`, data);
        return data;
    } catch (error) {
        console.error("Error fetching from Deezer API:", error);
        return { error: error.message || "Failed to fetch data from Deezer." };
    }
};

export const getDeezerCharts = async () => {
    const data = await fetchDeezer('/chart');
    return data;
};

export const getDeezerBrowseNewReleases = async () => {
    const data = await fetchDeezer('/editorial/0/releases'); // This might also be problematic, consider checking it.
    return data && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
};

export const getDeezerFeaturedPlaylists = async () => {
    // FIX: Changed to fetch from /chart and extract playlists from it
    const chartData = await fetchDeezer('/chart');
    // The /chart endpoint returns an object like { tracks: { data: [] }, albums: { data: [] }, playlists: { data: [] } }
    // We want the playlists data from this response.
    return chartData?.playlists?.data && Array.isArray(chartData.playlists.data)
        ? chartData.playlists.data
        : [];
};

export const getDeezerGenres = async () => {
    const data = await fetchDeezer('/genre');
    return data && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
};

// Ensure query parameters are correctly encoded for search functions
export const searchDeezerArtist = async (query) => {
    const data = await fetchDeezer(`/search/artist?q=${encodeURIComponent(query)}`);
    return data ? data.data : [];
};

export const searchDeezerTrack = async (query) => {
    const data = await fetchDeezer(`/search/track?q=${encodeURIComponent(query)}`);
    return data ? data.data : [];
};

export const searchDeezerAlbum = async (query) => {
    const data = await fetchDeezer(`/search/album?q=${encodeURIComponent(query)}`);
    return data ? data.data : [];
};

export const searchDeezerPlaylist = async (query) => {
    const data = await fetchDeezer(`/search/playlist?q=${encodeURIComponent(query)}`);
    return data ? data.data : [];
};