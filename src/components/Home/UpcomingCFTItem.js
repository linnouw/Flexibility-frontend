import React from 'react';
// @MUI
import { Grid, Typography, Divider, Stack} from '@mui/material';
// style
import '../../App.css';

export default function UpcomingCFTItem() {
  return (
    <Stack
    direction="row"
    divider={<Divider className="colored-divider" orientation="vertical" flexItem />}
    p={2}
  >
       <Grid xs={12} md={6} item container  direction="column"
            justifyContent="center"
            alignItems="flex-end"
            p={2}>
            <Grid item>
                <Typography className="product-item-title" noWrap>Opening Date</Typography>
            </Grid>
            <Grid item>
            <Typography className="product-item-title" noWrap>Product name</Typography>
            </Grid>
       </Grid>
       <Grid xs={12} md={6} item container direction="column"
            justifyContent="center"
            alignItems="flex-start"
            p={2}>
            <Grid item>
                <Typography className="product-item-title" noWrap>Total power : </Typography>
            </Grid>
            <Grid item>
                <Typography className="product-item-title">Duration : </Typography>
            </Grid>
            <Grid item>
                <Typography className="product-item-title" noWrap>Localization : </Typography>
            </Grid>
       </Grid>
       
    </Stack>
  );
}