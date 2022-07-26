import React from 'react';
import {Link} from 'react-router-dom';
// component
import UpcomingCFTItem from './UpcomingCFTItem';
// @MUI
import {Paper, Grid, Typography, Button, Divider} from '@mui/material';
// style
import '../../App.css';
//useContext
import Web3Context from "../../Web3Context";

export default function UpcomingCFT() {
  const context = React.useContext(Web3Context);
  const { cftsAddresses } = context;

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
        {cftsAddresses&&cftsAddresses.length!=0?
         ( cftsAddresses.map((address, index) => (
            <>
              <UpcomingCFTItem address={address} key={index}/>
            </>
          ))):(
            <Grid item m={1}>
              <Typography variant="h6" className="phrase">No CFTs</Typography>
            </Grid>
          )}
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