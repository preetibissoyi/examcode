import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        px: 2,
        bgcolor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Nimapara Autonomous College. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer; 