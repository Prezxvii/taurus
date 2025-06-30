// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { getDeezerCharts, getDeezerBrowseNewReleases } from '../services/deezerApi';
import MusicCard from '../components/MusicCard';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';

function HomePage() {
  const [charts, setCharts] = useState(null); // Will hold tracks, albums, artists, playlists from charts
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const [chartsData, newReleasesData] = await Promise.all([
          getDeezerCharts(),
          getDeezerBrowseNewReleases()
        ]);

        console.log('Charts Data received for Home:', chartsData); // Debugging
        console.log('New Releases Data received for Home:', newReleasesData); // Debugging

        if (chartsData && !chartsData.error) {
          setCharts(chartsData);
        } else {
          console.error("Error or no data for charts:", chartsData);
          setError(chartsData?.error || "Failed to load charts data.");
        }

        if (newReleasesData && !newReleasesData.error) {
          // Ensure newReleasesData is an array if the API returns an object or null
          setNewReleases(Array.isArray(newReleasesData) ? newReleasesData : (newReleasesData?.data || []));
        } else {
          console.error("Error or no data for new releases:", newReleasesData);
          // Only set a general error if newReleasesData explicitly indicates an error
          if (newReleasesData?.error) {
            setError(prev => prev ? `${prev} & Failed to load new releases.` : "Failed to load new releases.");
          }
          setNewReleases([]); // Ensure it's an empty array if there's an issue or no data
        }

      } catch (err) {
        console.error("An unexpected error occurred while fetching home page data:", err);
        setError("An unexpected error occurred while loading home page data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
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
          Loading your music hub...
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

  // Check if any section has content to display
  const hasContent = (
    (newReleases && newReleases.length > 0) ||
    (charts?.tracks?.data && charts.tracks.data.length > 0) ||
    (charts?.albums?.data && charts.albums.data.length > 0) ||
    (charts?.playlists?.data && charts.playlists.data.length > 0)
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome to Taurus Music
      </Typography>

      {!hasContent && (
          <Typography variant="h6" color="text.secondary">
              No content found. This might be due to API limitations or empty results.
              Please check your console for more details.
          </Typography>
      )}

      {/* New Releases Section */}
      {newReleases && newReleases.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            New Releases
          </Typography>
          <Grid container spacing={2}>
            {newReleases.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                {/* New releases are typically albums or tracks. Assuming album based on common API responses. */}
                <MusicCard item={item} type={item.type || 'album'} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Top Tracks from Charts */}
      {charts?.tracks?.data && charts.tracks.data.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Top Tracks
          </Typography>
          <Grid container spacing={2}>
            {charts.tracks.data.map((track) => (
              <Grid item key={track.id} xs={12} sm={6} md={4} lg={3}>
                <MusicCard item={track} type="track" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Top Albums from Charts */}
      {charts?.albums?.data && charts.albums.data.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Top Albums
          </Typography>
          <Grid container spacing={2}>
            {charts.albums.data.map((album) => (
              <Grid item key={album.id} xs={12} sm={6} md={4} lg={3}>
                <MusicCard item={album} type="album" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Top Playlists from Charts */}
      {charts?.playlists?.data && charts.playlists.data.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Top Playlists
          </Typography>
          <Grid container spacing={2}>
            {charts.playlists.data.map((playlist) => (
              <Grid item key={playlist.id} xs={12} sm={6} md={4} lg={3}>
                <MusicCard item={playlist} type="playlist" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default HomePage;