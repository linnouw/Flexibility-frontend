import React from 'react';
// components
import CFTItem from './CFTItem';
// @MUI
import {Grid, Typography} from '@mui/material';
// style
import '../../App.css';
//useContext
import Web3Context from "../../Web3Context";

export default function CFTList() {
  const context = React.useContext(Web3Context);
  const { cftsAddresses } = context;

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
            {cftsAddresses &&
            cftsAddresses.map((address, index) => ( 
                <Grid item  m={1} key={index}>
                    <CFTItem address={address}/>
                </Grid>
            ))}
        </Grid>
    </Grid>
  );
}