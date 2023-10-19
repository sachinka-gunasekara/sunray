import { Box, Grid, Typography, Button } from '@mui/material';
import React from 'react';
import Topbar from '../components/Topbar';
import hero from '../images/hero.jpg';
import { Link } from 'react-router-dom';

const styles = {
  wrapper: {
    backgroundColor: "#FFFFFF",
    paddingRight: '80px',
    paddingLeft: '80px',
    paddingTop: '10px',
    paddingBottom: '30px',
    background: `url(${hero}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    marginTop: '20px',
    background: '#272622', 
    '&:hover': {
      backgroundColor: '#DD7230', 
    },
  },
};

export default function Home() {
  return (
    <Box>
      <Topbar />
      <Box sx={styles.wrapper}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom sx={styles.text}>
              Stay ahead of the forecast with our comprehensive
            </Typography>
            <Typography variant="h4" gutterBottom sx={styles.text}>
               weather insights and real-time updates.
            </Typography>
          </Grid>
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
            <Button component={Link} to="/login"variant="contained" size="large" sx={styles.button}>
             Todays’ weather
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
