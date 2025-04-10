import React from 'react';
import { Box, Typography, Link, useTheme, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 4,
        px: 2,
        bgcolor: '#1a1a1a', // Dark background
        color: 'rgba(255, 255, 255, 0.9)', // Light text color
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 2 }} gutterBottom>
                Xappsoft Technologies Pvt Ltd
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.7)' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Kalamandir Royale building, Rupali Square, Plot no-364, Saheed Nagar, Bhubaneswar, Odisha 751007
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LanguageIcon sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.7)' }} />
                <Link
                  href="https://xappsoft.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    textDecoration: 'none',
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: 'white',
                    }
                  }}
                >
                  <Typography variant="body2">
                    https://xappsoft.com/
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            © {new Date().getFullYear()} Xappsoft Technologies Pvt Ltd. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer; 