// src/components/MainContent.js
import React from 'react';
import Box from '@mui/material/Box'; // Import Box

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flex: 1, // Allows MainContent to take up remaining horizontal space
        p: 3, // Consistent padding for content inside
        overflowY: 'auto', // Allows vertical scrolling if content overflows
        bgcolor: 'background.default', // Consistent background with app
      }}
    >
      {children}
    </Box>
  );
}

export default MainContent;