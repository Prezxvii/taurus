// api/deezer.js
import fetch from 'node-fetch'; // Make sure this import is correct

export default async function handler(request, response) {
  const { endpoint } = request.query;

  // Log for debugging on Vercel's side (you can view these in Vercel project logs)
  console.log('Vercel Function received request for endpoint:', endpoint);

  if (!endpoint) {
    // Ensure this response is JSON
    return response.status(400).json({ error: 'Missing "endpoint" query parameter.' });
  }

  const deezerApiUrl = `https://api.deezer.com${endpoint}`;
  console.log('Calling Deezer API URL:', deezerApiUrl);

  try {
    const apiResponse = await fetch(deezerApiUrl);
    console.log('Deezer API Response Status:', apiResponse.status);

    // Always attempt to parse response as JSON for consistency,
    // even if it's an error from Deezer.
    const responseText = await apiResponse.text(); // Get raw text
    let responseJson;
    try {
        responseJson = JSON.parse(responseText); // Try to parse as JSON
    } catch (parseError) {
        // If it's not JSON, it's a non-JSON error from Deezer or an empty body
        console.error('Deezer API did not return valid JSON:', responseText);
        // Return a generic error or the raw text if it's an unexpected format
        return response.status(apiResponse.status).send(responseText); // Send raw text/HTML if not JSON
    }


    if (!apiResponse.ok) {
      // If Deezer API itself returns an error, pass it through as JSON
      return response.status(apiResponse.status).json(responseJson);
    }

    // If successful, return the parsed JSON data
    return response.status(200).json(responseJson);

  } catch (error) {
    console.error('Vercel Function Error (during fetch or processing):', error);
    // Ensure this error response is JSON
    return response.status(500).json({ error: 'Failed to fetch data from Deezer API via Vercel proxy.', details: error.message });
  }
}