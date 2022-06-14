import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Box sx={{ width: '100%',position:'absolute',zIndex:200,top:'10vh' }}>
      <LinearProgress />
    </Box>
  );
}
