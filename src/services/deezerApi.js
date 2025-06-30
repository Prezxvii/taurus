// src/services/deezerApi.js (Updated for Vercel Deployment)

// BASE_URL will now point to your Vercel API route
// In development, this will be http://localhost:3000/api
// In production (Vercel), this will be https://your-vercel-app.vercel.app/api
const BASE_URL = '/api/deezer'; // This is the path to your Vercel Serverless Function

const fetchDeezer = async (deezerEndpoint) => { // Renamed parameter to avoid confusion
    // Construct the URL to your Vercel API route
    // Example: /api/deezer?endpoint=/chart
    const url = `${BASE_URL}?endpoint=${encodeURIComponent(deezerEndpoint)}`;

    try {
        const response = await fetch(url);

        console.log(`Fetching from Vercel proxy: ${url}`);
        console.log(`Response Status from Vercel proxy: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json(); // Vercel function returns JSON error
            console.error(`API Error from Vercel proxy for ${deezerEndpoint}: ${response.status} -`, errorData);
            throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Data from Vercel proxy for ${deezerEndpoint}:`, data);
        return data;
    } catch (error) {
        console.error("Error fetching from Deezer API via Vercel proxy:", error);
        return { error: error.message || "Failed to fetch data from Deezer." };
    }
};

export const getDeezerCharts = async () => {
    const data = await fetchDeezer('/chart');
    return data;
};

export const getDeezerBrowseNewReleases = async () => {
    const data = await fetchDeezer('/editorial/0/releases');
    return data && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
};

export const getDeezerFeaturedPlaylists = async () => {
    const chartData = await getDeezerCharts(); // Reuse getDeezerCharts to get the full chart data
    return chartData?.playlists?.data && Array.isArray(chartData.playlists.data)
        ? chartData.playlists.data
        : [];
};


export const getDeezerGenres = async () => {
    const data = await fetchDeezer('/genre');
    return data && Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
};

export const searchDeezerArtist = async (query) => {
    const data = await fetchDeezer(`/search/artist?q=${encodeURIComponent(query)}`);
    return data && Array.isArray(data.data) ? data.data : [];
};

export const searchDeezerTrack = async (query) => {
    const data = await fetchDeezer(`/search/track?q=${encodeURIComponent(query)}`);
    return data && Array.isArray(data.data) ? data.data : [];
};

export const searchDeezerAlbum = async (query) => {
    const data = await fetchDeezer(`/search/album?q=${encodeURIComponent(query)}`);
    return data && Array.isArray(data.data) ? data.data : [];
};

export const searchDeezerPlaylist = async (query) => {
    const data = await fetchDeezer(`/search/playlist?q=${encodeURIComponent(query)}`);
    return data && Array.isArray(data.data) ? data.data : [];
};