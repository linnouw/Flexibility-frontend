import React from 'react';
// components
import ProductListItem from './ProductListItem';
// @MUI
import {Paper, Typography, Grid, Pagination} from '@mui/material';
// style
import '../../App.css';

export default function ProductList() {
  return (
      <Paper elevation={0} style={{borderRadius: 10, height:"100%", padding:10}}>
          <Typography className="product-list-title">Product Items</Typography>
          <ProductListItem/>
          <Grid container direction="row" justifyContent="center" alignItems="center" p={1}>
          <Pagination count={2}/>
          </Grid>
      </Paper>
  );
}