import React from 'react';
// components

// @MUI
import {Grid,Typography,Button, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom';
// style
import '../../App.css';

export default function ARL() {

  return (
    <Grid  container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start" 
        className="components-background" p={1}>
        <Grid item container m={1}>
          <Grid item container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <Link className="link" to="/cftList">
                <Button variant="text">
                    <ArrowBackIcon/>
                    Back to CFT list
                </Button>
              </Link>      
            </Grid>
            <Grid item>
            <Typography variant="h5" className="title">Activation requests list</Typography>
            </Grid>
        </Grid>
        <Grid item m={1} p={1} container direction="column" justifyContent="center" alignItems="stretch">
    <Paper elevation={0} style={{borderRadius: 10}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="label" >AR Address</TableCell>
          <TableCell className="label" align="right">Owner</TableCell>
          <TableCell className="label" align="right">Product ID</TableCell>
          <TableCell className="label" align="right">Quantity</TableCell>
          <TableCell className="label" align="right">Localization</TableCell>
          <TableCell className="label" align="right">Start of delivery</TableCell>
          <TableCell className="label" align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      {/* <TableBody>
          <TableRow
            
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
      </TableBody> */}
    </Table>
    </Paper>
    </Grid>
    </Grid>
  );
}