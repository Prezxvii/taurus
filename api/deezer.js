// api/deezer.js
// This is a Vercel Serverless Function that acts as a proxy to the Deezer API.

import fetch from 'node-fetch'; // Vercel's Node.js runtime has fetch available

export default async function handler(request, response) {
  // Get the Deezer endpoint from the query parameters (e.g., /api/deezer?endpoint=/chart)
  const { endpoint } = request.query;

  if (!endpoint) {
    return response.status(400).json({ error: 'Missing "endpoint" query parameter.' });
  }

  // Construct the full Deezer API URL
  const deezerApiUrl = `https://api.deezer.com${endpoint}`;

  try {
    const apiResponse = await fetch(deezerApiUrl);

    // If the Deezer API returns an error, pass it through
    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      return response.status(apiResponse.status).json(errorData);
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    console.error('Error fetching from Deezer API via Vercel function:', error);
    return response.status(500).json({ error: 'Failed to fetch data from Deezer API.', details: error.message });
  }
}