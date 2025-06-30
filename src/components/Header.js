// src/components/Header.js
import React from 'react';
import SearchBar from './SearchBar';
import './Header.css'; // Keep existing custom CSS if you have it
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Box from '@mui/material/Box'; // Import Box for layout
import Typography from '@mui/material/Typography'; // For consistent text styling

function Header() {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2, // Consistent padding
        bgcolor: 'background.paper', // White background from theme
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)', // Subtle shadow for "glossy" feel
        borderBottom: '1px solid #e0e0e0', // Light border for definition
        // Consider a slight gradient or stronger shadow for a premium glossy feel if desired
        // background: 'linear-gradient(to right, #ffffff, #f8f8f8)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <LibraryMusicIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Taurus Music
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, mx: 4, maxWidth: '500px' }}> {/* Max width for search bar */}
        <SearchBar />
      </Box>
      {/* User Profile, etc. can go here later */}
    </Box>
  );
}

export default Header;