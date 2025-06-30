// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Your vibrant blue
      light: '#4d9cff',
      dark: '#0056b3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#6c757d', // A subtle grey
      light: '#8d949e',
      dark: '#495057',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fa', // Light background for the overall page
      paper: '#ffffff', // White background for cards, modals etc.
    },
    text: {
      primary: '#343a40',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: [
      'Inter', // Modern font. Remember to link in public/index.html
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px', // More rounded for "modern"
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', // Subtle default shadow
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)', // Lift on hover
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)', // Enhanced shadow on hover for "glossy"
          },
        },
      },
    },
    MuiAppBar: { // If you decide to use AppBar later
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', // Subtle AppBar shadow
          background: 'linear-gradient(45deg, #007bff 10%, #4d9cff 100%)', // GLOSSY gradient!
          color: '#fff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: '#007bff',
          '&:hover': {
            textDecoration: 'underline',
            color: '#0056b3',
          },
        },
      },
    },
    MuiTextField: { // Styling for your search bar
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            '& fieldset': {
              borderColor: 'primary.light', // Light blue border
            },
            '&:hover fieldset': {
              borderColor: 'primary.main', // Main blue on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.dark', // Dark blue on focus
              borderWidth: '2px', // Thicker border on focus
            },
          },
          '& .MuiInputLabel-root': {
            color: 'text.secondary',
            '&.Mui-focused': {
              color: 'primary.main',
            },
          },
          '& .MuiInputBase-input': {
            color: 'text.primary',
            '&::placeholder': {
              color: 'text.secondary',
              opacity: 1, // Ensure placeholder is visible
            },
          },
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)', // Subtle shadow for search bar
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', // Enhanced shadow on hover
          },
        },
      },
    },
  },
});

export default theme;