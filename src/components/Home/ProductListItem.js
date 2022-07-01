import React from 'react';
// @MUI
import {Grid, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@mui/material';
// style
import '../../App.css';

export default function ProductListItem() {
  return (
        <Grid  container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            p={2}>
           <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <Grid className="product-item-value-box">
                        <Typography item className="product-item-value">Product Name</Typography>                  
                   </Grid>
                </ListItem>
                <ListItem>
                   <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch">
                            <Grid item>
                                <Typography className="product-item-title">EIC Code</Typography>
                            </Grid>
                            <Grid item className="product-item-value-box">
                                <Typography className="product-item-value">12</Typography>
                            </Grid>
                   </Grid>                    
                </ListItem>
                <Divider/>
                <ListItem>
                   <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch">
                            <Grid item>
                                <Typography className="product-item-title">Price Conditions</Typography>
                            </Grid>
                            <Grid item className="product-item-value-box">
                                <Typography className="product-item-value">12</Typography>
                            </Grid>
                   </Grid>                    
                </ListItem>
                <Divider/>
                <ListItem>
                   <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch">
                            <Grid item>
                                <Typography className="product-item-title">Direction</Typography>
                            </Grid>
                            <Grid item className="product-item-value-box">
                                <Typography className="product-item-value">12</Typography>
                            </Grid>
                   </Grid>                    
                </ListItem>
                <Divider/>
                <ListItem>
                   <Grid container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="stretch">
                            <Grid item>
                                <Typography className="product-item-title">Ramping Period</Typography>
                            </Grid>
                            <Grid item className="product-item-value-box">
                                <Typography className="product-item-value">12</Typography>
                            </Grid>
                   </Grid>                    
                </ListItem>
            </List>
        </Grid>

  );
}