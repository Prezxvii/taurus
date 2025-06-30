// src/pages/PlaylistsPage.js
import React, { useState, useEffect } from 'react';
import { getDeezerFeaturedPlaylists } from '../services/deezerApi';
import MusicCard from '../components/MusicCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const data = await getDeezerFeaturedPlaylists();
        console.log('Featured Playlists Data received:', data); // Debugging

        if (data && !data.error) {
          // Ensure data is an array if the API returns an object with a 'data' key, or if it's already an array
          setPlaylists(Array.isArray(data) ? data : (data?.data || []));
        } else {
          console.error("Error or no data for featured playlists:", data);
          setError(data?.error || "Failed to load featured playlists from Deezer.");
          setPlaylists([]); // Ensure it's an empty array on error or no data
        }
      } catch (err) {
        console.error("An unexpected error occurred while fetching featured playlists from Deezer:", err);
        setError("An unexpected error occurred while fetching featured playlists from Deezer.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderLoadingSkeletons = (count) => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
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
          Loading featured playlists...
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Please check your console for more details or try refreshing the page.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
        Featured Playlists
      </Typography>

      {playlists.length > 0 ? (
        <Grid container spacing={2}>
          {playlists.map((playlist) => (
            <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
              <MusicCard item={playlist} type="playlist" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No featured playlists found from Deezer. This might be due to API limitations or empty results.
        </Typography>
      )}
    </Box>
  );
}

export default PlaylistsPage;