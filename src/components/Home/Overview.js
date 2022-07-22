import React from "react";
// @MUI
import { Paper, Grid, Typography } from "@mui/material";
// style
import "../../App.css";
//useContext
import Web3Context from "../../Web3Context";

export default function Overview() {
  const context = React.useContext(Web3Context);
  const { productsAddresses, cftsAddresses } = context;

  return (
    <Paper elevation={0} style={{ borderRadius: 10 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" className="count">
            {cftsAddresses && cftsAddresses.length}
          </Typography>
          <Typography className="phrase">Total CFTs</Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" className="count">
            {productsAddresses && productsAddresses.length}
          </Typography>
          <Typography className="phrase">Total Products</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
