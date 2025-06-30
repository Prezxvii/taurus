// server/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to allow requests from your React app
app.use(cors({ origin: 'http://localhost:3000' }));

// Define the Deezer API base URL
const DEEZER_BASE_URL = 'https://api.deezer.com';

// Route to proxy Deezer API requests
// FIX: Changed '/deezer/*' to '/deezer/:endpoint(*)'
app.get('/deezer/:endpoint(*)', async (req, res) => {
    // Extract the Deezer endpoint from the request URL using the named parameter
    const deezerEndpoint = req.params.endpoint; // Corrected: access via req.params.endpoint
    
    // Construct the full Deezer URL, including any query parameters from the client request
    const queryParams = new URLSearchParams(req.query).toString();
    const fullDeezerUrl = `${DEEZER_BASE_URL}/${deezerEndpoint}${queryParams ? `?${queryParams}` : ''}`;

    console.log(`Proxying request to: ${fullDeezerUrl}`);

    try {
        const response = await axios.get(fullDeezerUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error proxying Deezer request:', error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            res.status(500).send('No response received from Deezer API.');
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send('Error setting up proxy request.');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});