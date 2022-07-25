'use strict';
import React from "react";
// @MUI
import {
  Grid,
  Typography,
  Divider,
  List,
  ListItem
} from "@mui/material";
// style
import "../../App.css";
//web3
import Web3 from "web3/dist/web3.min.js";
import Product_contract from "../../abi/Product.json";
//useContext
import Web3Context from "../../Web3Context";

export default function ProductListItem(address) {
  const context = React.useContext(Web3Context);
  const { projectUrl } = context;
  const [productDetails, setProductDetails] = React.useState([]);

  React.useEffect(() => {
    load();
  }, [productDetails]);

  async function load() {
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    //interact with specific contract
    const Product = new web3.eth.Contract(Product_contract.abi, address["address"]);
    const details = await Product.methods.getProductDetails().call();
    setProductDetails(Object.values(details));   
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      p={2}
    >
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <ListItem>
          <Grid className="product-item-value-box">
            <Typography item className="product-item-value">
              {productDetails[1]}
            </Typography>
          </Grid>
        </ListItem>
        <ListItem>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography className="product-item-title">EIC Code</Typography>
            </Grid>
            <Grid item className="product-item-value-box">
              <Typography className="product-item-value">{productDetails[0]}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography className="product-item-title">
                Price Conditions
              </Typography>
            </Grid>
            <Grid item className="product-item-value-box">
              <Typography className="product-item-value">{productDetails[2]}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography className="product-item-title">Direction</Typography>
            </Grid>
            <Grid item className="product-item-value-box">
              <Typography className="product-item-value">{productDetails[3]}</Typography>
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
        <ListItem>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <Typography className="product-item-title">
                Ramping Period
              </Typography>
            </Grid>
            <Grid item className="product-item-value-box">
              <Typography className="product-item-value">{productDetails[4]}</Typography>
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </Grid>
  );
}
