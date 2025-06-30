// src/components/Footer.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// You might need to install these icons if you haven't:
// npm install @mui/icons-material

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto', // Pushes footer to the bottom if parent is flex column
        p: 3, // Padding
        bgcolor: 'primary.dark', // Dark primary color from theme for contrast
        color: 'primary.contrastText', // White text
        textAlign: 'center',
        // Subtle top border for definition
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        // Optional: a very subtle gradient for a touch of 'glossy'
        background: 'linear-gradient(to right, #0056b3 0%, #007bff 100%)',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} Taurus Music. All rights reserved.
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Data provided by <Link href="https://developers.deezer.com/" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ textDecoration: 'underline' }}>Deezer API</Link>.
      </Typography>
      <Box sx={{ mt: 1 }}>
        <IconButton
          component={Link}
          href="https://github.com/your-github-profile" // Replace with your GitHub
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          sx={{ color: 'primary.contrastText', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://linkedin.com/in/your-linkedin-profile" // Replace with your LinkedIn
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{ color: 'primary.contrastText', '&:hover': { color: 'rgba(255,255,255,0.8)' } }}
        >
          <LinkedInIcon />
        </IconButton>
        {/* Add more social icons if needed */}
      </Box>
    </Box>
  );
}

export default Footer;