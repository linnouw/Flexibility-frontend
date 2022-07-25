import React from "react";
// components
import ProductListItem from "./ProductListItem";
// @MUI
import { Paper, Typography, Grid, Pagination } from "@mui/material";
// style
import "../../App.css";
//useContext
import Web3Context from "../../Web3Context";

export default function ProductList() {
  const context = React.useContext(Web3Context);
  const { productsAddresses } = context;
  const [page, setPage] = React.useState(1);
  
  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Paper
      elevation={0}
      style={{ borderRadius: 10, height: "100%", padding: 10 }}
    >
      <Typography className="product-list-title">Product Items</Typography>
      {productsAddresses &&
        productsAddresses.map((address, index) => (
          <>
            <ProductListItem address={address} key={index}/>
          </>
        ))}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        p={1}
      >
        <Pagination count={2} page={page} onChange={handleChange}/>
      </Grid>
    </Paper>
  );
}
