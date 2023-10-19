import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';

const styles = {
  weatherAppContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
};

class WeatherApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'Colombo',
      latitude: '',
      longitude: '',
      currentWeatherData: null,
      forecastData: [],
      loading: false,
    };
  }

  fetchWeather = (latitude, longitude) => {
    const apiKey = '7d92203b9bf380fae22bf93dd9d98f0e';

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then((response) => {
        const currentWeatherData = {
          temperature: `${response.data.main.temp}°C`,
          humidity: `${response.data.main.humidity}%`,
          description: response.data.weather[0].description,
        };

        this.setState({
          currentWeatherData,
          loading: false,
        });
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        this.setState({
          currentWeatherData: null,
          loading: false,
        });
      });
  }

  fetchForecast = (latitude, longitude) => {
    const apiKey = '7d92203b9bf380fae22bf93dd9d98f0e';
  
    axios
      .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
      .then((response) => {
        const forecastData = response.data.list
          .filter((item, index) => index % 8 === 0) // Get data for every 24 hours (8 times a day)
          .slice(0, 3) // Get the next 3 days only
          .map((item) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            temperature: `${item.main.temp}°C`,
            humidity: `${item.main.humidity}%`,
            description: item.weather[0].description,
          }));
  
        this.setState({
          forecastData,
        });
      })
      .catch((error) => {
        console.error('Error fetching forecast data:', error);
        this.setState({
          forecastData: [],
        });
      });
  }  

  handleSearch = () => {
    const { latitude, longitude } = this.state;

    if (latitude && longitude) {
      this.setState({ loading: true });
      this.fetchWeather(latitude, longitude);
      this.fetchForecast(latitude, longitude);
    }
  }

  render() {
    const { latitude, longitude, currentWeatherData, forecastData, loading } = this.state;

    return (
    <Grid sx={styles.weatherContainer}>
      <Button component={Link} to="/" variant="contained" size="medium" style={{margin: '20px', background: '#272622'}}>
        Back to Home Page
      </Button>
      <Grid container sx={styles.weatherAppContainer}>
        <Grid item xs={12} style={{marginBottom: '20px'}}>
          <Typography variant="h4">
            Todays’ Weather in Colombo
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{padding: '20px'}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  label="Latitude"
                  variant="outlined"
                  fullWidth
                  value={latitude}
                  onChange={(e) => this.setState({ latitude: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Longitude"
                  variant="outlined"
                  fullWidth
                  value={longitude}
                  onChange={(e) => this.setState({ longitude: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx = {{background: '#272622', ':hover': { background: '#272622', color: '#fff' }}}
                  onClick={this.handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
            <Box mt={3}>
              {loading ? (
                <CircularProgress />
              ) : currentWeatherData ? (
                <div>
                  <Typography variant="h6">Temperature: {currentWeatherData.temperature}</Typography>
                  <Typography variant="h6">Humidity: {currentWeatherData.humidity}</Typography>
                  <Typography variant="h6">Condition: {currentWeatherData.description}</Typography>
                </div>
              ) : (
                <Typography variant="body1">
                  No data available. Please check the coordinates.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        {forecastData.length > 0 && (
          <Grid item xs={12} mt={3}>
            <Paper elevation={3} className="forecast">
              <Typography style={{paddingTop: '20px'}} variant="h5">Weather forecast for next 3 days</Typography>
              <Grid container spacing={2}>
                {forecastData.map((forecast, index) => (
                  <Grid item xs key={index} style={{margin: '20px', height: '100px', width: '300px'}}>
                    <Paper elevation={3} className="forecast-item">
                      <Typography variant="body1">Date: {forecast.date}</Typography>
                      <Typography variant="body1">Temperature: {forecast.temperature}</Typography>
                      <Typography variant="body1">Humidity: {forecast.humidity}</Typography>
                      <Typography variant="body1">Condition: {forecast.description}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
    );
  }
}

export default WeatherApp;