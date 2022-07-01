import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
// component
import UpcomingCFTItem from './UpcomingCFTItem';
// @MUI
import {Paper, Grid, Typography, Button, Divider} from '@mui/material';
// style
import '../../App.css';

export default function UpcomingCFT() {
  return (
    <Paper elevation={0} style={{borderRadius: 10, padding:10}}>
      <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center">
        <Typography className="product-list-title">Upcoming CFT</Typography>
      </Grid>
      <Divider orientation="horizontal"/>
      <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center">
        <UpcomingCFTItem/>
        <UpcomingCFTItem/>
        <Divider orientation="horizontal"/>
      </Grid>
      <Grid container
          direction="column"
          justifyContent="center"
          alignItems="center">
        <Link className="link" to="/cftList">
        <Button variant="text">See more CFTs</Button>
        </Link>
      </Grid>
    </Paper>
  );
}