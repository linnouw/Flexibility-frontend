import React from 'react';
// components
import Overview from './Overview';
import Infos from './Infos';
import ProductsList from './ProductList';
import UpcomingCFT from './UpcomingCFT';
// @MUI
import {Grid, Typography} from '@mui/material';
// style
import '../../App.css';

export default function Home() {
  return (
      <Grid container direction="row" className="components-background">
          <Grid item xs={12} md={8} direction="column" justifyContent="center"
            alignItems={{md:"flex-start", xs:"center"}}>
            <Grid item xs={2} p={2}>
                <Typography variant="h5" className="title">Overview</Typography>
            </Grid>
            <Grid item xs={4} p={2}>
                <Overview/>
            </Grid>
            <Grid item xs={6} p={2}>
                 <ProductsList/>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} p={2} direction="column"
            justifyContent="flex-start"
            alignItems={{md:"flex-start", xs:"center"}}>
                  <Infos/>
                  <UpcomingCFT/>
          </Grid>
      </Grid>
  );

}