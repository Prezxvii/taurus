// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchDeezerArtist, searchDeezerTrack, searchDeezerAlbum, searchDeezerPlaylist } from '../services/deezerApi';
import MusicCard from '../components/MusicCard';
// Material-UI Imports
// Removed TextField as it's now handled by Header's SearchBar
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
// No need for InputAdornment or SearchIcon here anymore

function SearchPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Keep this to display the current query

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');

    // Only trigger fetch if query exists and is new
    if (query && query !== searchQuery) {
      setSearchQuery(query); // Update local state
      const fetchResults = async () => {
        setLoading(true);
        setError(null);
        setSearchResults(null); // Clear previous results

        try {
          const [artists, tracks, albums, playlists] = await Promise.all([
            searchDeezerArtist(query),
            searchDeezerTrack(query),
            searchDeezerAlbum(query),
            searchDeezerPlaylist(query)
          ]);

          setSearchResults({
            artists: { items: artists || [] },
            tracks: { items: tracks || [] },
            albums: { items: albums || [] },
            playlists: { items: playlists || [] },
          });

        } catch (err) {
          console.error("Error searching Deezer:", err);
          setError("An error occurred during search.");
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    } else if (!query && searchResults) {
      // If query is cleared from URL, clear results and local state
      setSearchResults(null);
      setSearchQuery('');
    }
    // Added dependency for searchQuery to ensure effect re-runs if query changes directly (e.g. via internal Link)
  }, [location.search, searchQuery, searchResults]); // Retain searchResults to prevent infinite loop on re-render

  // No need for handleInputChange here anymore as input is in Header

  if (!searchQuery) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Type something in the search bar to find music on Deezer.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Searching for "{searchQuery}" on Deezer...
        </Typography>
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

  const hasResults = searchResults && (
    searchResults.tracks?.items.length > 0 ||
    searchResults.artists?.items.length > 0 ||
    searchResults.albums?.items.length > 0 ||
    searchResults.playlists?.items.length > 0
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Results for "{searchQuery}" on Deezer
      </Typography>

      {/* REMOVED THE TEXTFIELD FROM HERE */}

      {!hasResults && !loading && !error && (
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}> {/* Added mt for spacing */}
          No results found for "{searchQuery}" on Deezer.
        </Typography>
      )}

      {searchResults?.tracks?.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Songs
          </Typography>
          <Grid container spacing={2}>
            {searchResults.tracks.items.map((track) => (
              <Grid item key={track.id} xs={12} sm={6} md={4} lg={3}>
                <MusicCard item={track} type="track" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {searchResults?.artists?.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Artists
          </Typography>
          <Grid container spacing={2}>
            {searchResults.artists.items.map((artist) => (
              <Grid item key={artist.id} xs={12} sm={6} md={4} lg={3}>
                <MusicCard item={artist} type="artist" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {searchResults?.albums?.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Albums
          </Typography>
          <Grid container spacing={2}>
            {searchResults.albums.items.map((album) => (
              <Grid item key={album.id} xs={12} sm={6} md={4} lg={3}>
                <MusicCard item={album} type="album" />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {searchResults?.playlists?.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom>
            Playlists
          </Typography>
          <Grid container spacing={2}>
            {searchResults.playlists.items.map((playlist) => (
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

export default SearchPage;