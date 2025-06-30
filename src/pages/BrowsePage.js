// src/pages/BrowsePage.js
import React, { useState, useEffect } from 'react';
import { getDeezerGenres } from '../services/deezerApi'; // Import the new API call
import MusicCard from '../components/MusicCard';
// Material-UI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

function BrowsePage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDeezerGenres();
        if (data && !data.error) {
          // Filter out the "All" genre if it exists, as it often has no proper image
          setGenres(data.filter(genre => genre.id !== 0 && genre.name !== "All"));
        } else {
          setError(data?.error || "Failed to load genres from Deezer.");
        }
      } catch (err) {
        console.error("Error fetching genres from Deezer:", err);
        setError("An error occurred while fetching genres from Deezer.");
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
          Loading music genres...
        </Typography>
        {renderLoadingSkeletons(8)} {/* Show more skeletons for a full page */}
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
        Browse Music Genres
      </Typography>

      {genres.length > 0 ? (
        <Grid container spacing={2}>
          {genres.map((genre) => (
            <Grid item key={genre.id} xs={12} sm={6} md={4} lg={3}>
              <MusicCard item={genre} type="genre" /> {/* Pass type="genre" */}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No genres found from Deezer.
        </Typography>
      )}
    </Box>
  );
}

export default BrowsePage;