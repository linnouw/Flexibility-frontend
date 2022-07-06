import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';
// components

// @MUI
import {Card, CardContent, Typography, CardActions, Button} from '@mui/material';
// style
import '../../App.css';

export default function CFTItem() {
  return (
    <Card sx={{ minWidth: 275 }} elevation={0} style={{borderRadius: 10}}>
    <CardContent>
      <Typography className="cftItem-text" sx={{ fontSize: 14 }} gutterBottom>
        00:00
      </Typography>
      <Typography className="cftItem-text" variant="h5" component="div">
        Product
      </Typography>
      <Typography className="cftItem-text" sx={{ mb: 1.5 }}>
        For : opening date
      </Typography>
      <Typography className="cftItem-text" variant="body2">
        10 MW
      </Typography>
      <Typography className="cftItem-text" variant="body2">
        Zone A
      </Typography>
    </CardContent>
    <CardActions>
        <Link className="link" to="/createAR">
            <Button size="small">Submit AR</Button>
        </Link>
        <Link className="link" to="/createBid">
            <Button size="small">Submit Bid</Button>
        </Link>
        <Link className="link" to="/ARL">
            <Button size="small">View AR list</Button>
        </Link>
    </CardActions>
  </Card>
  );
}