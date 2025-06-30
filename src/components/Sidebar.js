// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import MicIcon from '@mui/icons-material/Mic';
import Box from '@mui/material/Box'; // Import Box

function Sidebar() {
  return (
    <Box
      component="aside"
      sx={{
        width: 240, // Slightly wider sidebar for better icon/text spacing
        bgcolor: 'background.paper', // White background
        p: 2, // Padding inside
        boxShadow: '2px 0 5px rgba(0,0,0,0.03)', // Subtle shadow
        borderRight: '1px solid #e0e0e0', // Light border for definition
        flexShrink: 0, // Prevent sidebar from shrinking
        overflowY: 'auto', // Allow sidebar to scroll if many items
      }}
    >
      <nav>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}> {/* Use Box for ul styling */}
          <Box component="li" sx={{ mb: 1.5 }}> {/* Use Box for li styling with margin */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5, // Increased gap for better spacing
                  p: 1.25, // Increased padding for click area
                  borderRadius: '8px',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover', // Material-UI hover color
                    color: 'primary.main', // Highlight text on hover
                  },
                }}
              >
                <HomeIcon /> Home
              </Box>
            </Link>
          </Box>
          <Box component="li" sx={{ mb: 1.5 }}>
            <Link to="/browse" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.25,
                  borderRadius: '8px',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                <ExploreIcon /> Browse
              </Box>
            </Link>
          </Box>
          <Box component="li" sx={{ mb: 1.5 }}>
            <Link to="/playlists" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.25,
                  borderRadius: '8px',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                <PlaylistPlayIcon /> Playlists
              </Box>
            </Link>
          </Box>
          <Box component="li" sx={{ mb: 1.5 }}>
            <Link to="/artists" style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.25,
                  borderRadius: '8px',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                <MicIcon /> Artists
              </Box>
            </Link>
          </Box>
        </Box>
      </nav>
    </Box>
  );
}

export default Sidebar;