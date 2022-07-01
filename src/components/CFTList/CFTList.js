import React from 'react';
// components
import CFTItem from './CFTItem';
// @MUI
import {Grid, Typography} from '@mui/material';
// style
import '../../App.css';

export default function CFTList() {
  return (
    <Grid container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start" 
        className="components-background" p={1}>
        <Grid item m={1}>
            <Typography variant="h5" className="title">List of current CFTs</Typography>
        </Grid>
        <Grid item container m={1}>
            <Grid item  m={1}>
                <CFTItem />
            </Grid>
            <Grid item  m={1}>
                <CFTItem />
            </Grid>
        </Grid>
    </Grid>
  );
}