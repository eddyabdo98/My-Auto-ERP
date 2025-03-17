import { Box, Typography, Paper, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Typography variant="h6" sx={{ mb: 3 }}>
        Welcome back, {user?.username}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body1">
              • View and manage users
            </Typography>
            <Typography variant="body1">
              • Access system settings
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Typography variant="body1">
              • System is running normally
            </Typography>
            <Typography variant="body1">
              • Last backup: Today at 00:00
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}