// src/pages/ArtistsPage.js
import React, { useState, useEffect } from 'react';
import { getDeezerCharts } from '../services/deezerApi'; // Use getDeezerCharts for top artists
import MusicCard from '../components/MusicCard';
// Material-UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDeezerCharts();
        if (data && data.artists && data.artists.data && !data.error) {
          setArtists(data.artists.data.slice(0, 20)); // Get top 20 artists from charts
        } else {
          setError(data?.error || "Failed to load artists from Deezer charts.");
        }
      } catch (err) {
        console.error("Error fetching artists from Deezer:", err);
        setError("An error occurred while fetching artists from Deezer.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderLoadingSkeletons = (count) => (
    <Grid container spacing={2}>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Box sx={{ width: 200, m: 1, p: 1, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <Skeleton variant="rectangular" width={180} height={180} sx={{ borderRadius: '4px' }} />
            <Skeleton width="80%" sx={{ mt: 1 }} />
            <Skeleton width="60%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading top artists...
        </Typography>
        {renderLoadingSkeletons(8)}
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Top Artists
      </Typography>

      {artists.length > 0 ? (
        <Grid container spacing={2}>
          {artists.map((artist) => (
            <Grid item key={artist.id} xs={12} sm={6} md={4} lg={3}>
              <MusicCard item={artist} type="artist" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No top artists found from Deezer.
        </Typography>
      )}
    </Box>
  );
}

export default ArtistsPage;