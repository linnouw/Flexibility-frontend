import React from 'react';
// @MUI
import {Paper, Grid, Typography} from '@mui/material';
// style
import '../../App.css';

export default function Overview() {
  return (
    <Paper elevation={0} style={{borderRadius: 10}}>
        <Grid container direction="row" justifyContent="space-between"
        alignItems="center" p={2}>
            
            <Grid item container xs={12} md={3} direction="column" justifyContent="center"
        alignItems="center">
                <Typography variant="h5" className="count">12</Typography>
                <Typography className="phrase">Total CFTs</Typography>
            </Grid>
            <Grid item container xs={12} md={3} direction="column" justifyContent="center"
        alignItems="center">
                <Typography variant="h5" className="count">12</Typography>
                <Typography className="phrase">Total Products</Typography>
            </Grid>
            <Grid item container xs={12} md={3} direction="column" justifyContent="center"
        alignItems="center">
                <Typography variant="h5" className="count">12</Typography>
                <Typography className="phrase">Total Bids</Typography>
            </Grid>
        </Grid>
        </Paper>
  );
}