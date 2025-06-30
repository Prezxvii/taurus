// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent'; // This will become a simple wrapper
import Footer from './components/Footer';

// Material-UI Imports for Theming and Layout
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'; // Import Box for layout
import theme from './theme'; // Import your custom theme

// Page Components
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import PlaylistsPage from './pages/PlaylistsPage';
import ArtistsPage from './pages/ArtistsPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh', // Ensure app takes full viewport height
            bgcolor: 'background.default', // Apply a default background color from theme
          }}
        >
          <Header />
          <Box
            sx={{
              display: 'flex',
              flex: 1, // This allows the main content area to grow and push footer down
              overflow: 'hidden', // Prevents main content from spilling out
            }}
          >
            <Sidebar />
            <MainContent> {/* MainContent will handle its own padding/scrolling */}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/playlists" element={<PlaylistsPage />} />
                <Route path="/artists" element={<ArtistsPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/callback" element={<HomePage />} />
                <Route path="*" element={<h2>404: Page Not Found</h2>} />
              </Routes>
            </MainContent>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
