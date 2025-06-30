// src/components/MusicCard.js
import React, { useState, useRef } from 'react';
// Material-UI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function MusicCard({ item, type }) {
  let title, subtitle, imageUrl, link, previewUrl = '';
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!item) {
    return null;
  }

  // Deezer specific property mappings
  if (type === 'track') {
    title = item.title;
    subtitle = item.artist?.name;
    imageUrl = item.album?.cover_medium || 'https://via.placeholder.com/150?text=No+Image';
    link = item.link;
    previewUrl = item.preview;
  } else if (type === 'playlist') {
    title = item.title;
    subtitle = `by ${item.user?.name || 'Various'}`;
    imageUrl = item.picture_medium || 'https://via.placeholder.com/150?text=No+Image';
    link = item.link;
  } else if (type === 'artist') {
    title = item.name;
    subtitle = 'Artist';
    imageUrl = item.picture_medium || 'https://via.placeholder.com/150?text=No+Image';
    link = item.link;
  } else if (type === 'album') {
    title = item.title;
    subtitle = item.artist?.name;
    imageUrl = item.cover_medium || 'https://via.placeholder.com/150?text=No+Image';
    link = item.link;
  } else if (type === 'genre') { // NEW: Handling for Genre type
    title = item.name;
    subtitle = 'Music Genre'; // Or simply 'Genre'
    imageUrl = item.picture_medium || 'https://via.placeholder.com/150?text=No+Image';
    // Deezer genre links aren't directly navigable through simple IDs via official embeds.
    // This is a placeholder or a link to a generic Deezer search.
    // For specific genre content, you'd typically search within the genre or use genre-specific API endpoints.
    // For now, providing a generic Deezer link or no link if it's confusing. Let's make it a general Deezer link.
    link = `https://www.deezer.com/search/${encodeURIComponent(item.name)}/genre`; // Link to Deezer search for genre
  }
  else {
    title = item.name || item.title || 'Unknown Item';
    subtitle = '';
    imageUrl = 'https://via.placeholder.com/150?text=No+Image';
    link = '';
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        document.querySelectorAll('audio').forEach(audio => {
          if (audio !== audioRef.current && !audio.paused) {
            audio.pause();
          }
        });
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  if (!imageUrl) {
    imageUrl = 'https://via.placeholder.com/150?text=No+Image';
  }

  return (
    <Card
      sx={{
        width: 200,
        m: 1,
        position: 'relative',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%' }}>
        <CardMedia
          component="img"
          image={imageUrl}
          alt={title}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0',
          }}
        />
        {type === 'track' && previewUrl && (
          <IconButton
            aria-label={isPlaying ? 'pause' : 'play'}
            onClick={togglePlay}
            sx={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              color: 'white',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              width: 44,
              height: 44,
            }}
          >
            {isPlaying ? <PauseIcon sx={{ fontSize: 28 }} /> : <PlayArrowIcon sx={{ fontSize: 28 }} />}
          </IconButton>
        )}
      </Box>

      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          noWrap
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {subtitle}
          </Typography>
        )}
        {type === 'track' && previewUrl && (
          <audio ref={audioRef} src={previewUrl} onEnded={handleAudioEnded} />
        )}
      </CardContent>

      {/* Links section at the very bottom of the card content */}
      <Box sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column' }}>
        {link && (
          <Link href={link} target="_blank" rel="noopener noreferrer" variant="body2" sx={{ display: 'block' }}>
            View on Deezer
          </Link>
        )}
        {type === 'track' && link && (
          <Link
              href={`https://widget.deezer.com/widget/dark/track/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{ mt: 0.5, display: 'block' }}
          >
              Embed Full Track
          </Link>
        )}
      </Box>
    </Card>
  );
}

export default MusicCard;