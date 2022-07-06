import React from 'react';
// components

// @MUI
import {Grid, Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link} from 'react-router-dom';
// style
import '../../App.css';

export default function CFTItem() {
  return (
    <Grid container direction="column" justifyContent="flex-start" alignItems="center" className="components-background">
    <Grid item m={1} container direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Link className="link" to="/cftList">
        <Button variant="text">
            <ArrowBackIcon/>
            Back to CFT list
        </Button>
        </Link>      
    </Grid>
    <Paper elevation={0} style={{borderRadius: 10, padding: 10}}>
        <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center">
            <Grid item p={1}>
                <Typography variant="h6" className="form-title">Submit an activation request</Typography>
            </Grid>
            <Grid item container
            direction="row"
            justifyContent="space-around"
            alignItems="center">
                <Grid item xs={12} md={6} p={1} container
                direction="column"
                justifyContent="center"
                alignItems={{md: "flex-end", xs: "flex-start"}}>
                      <Grid item p={1}>
                        <Typography className="label">Owner:</Typography>
                        <TextField type="text" sx={{ m: 1, minWidth: 250 }}/>
                    </Grid>
                    <Grid item p={1}>
                    <Typography className="label">Product:</Typography>
                    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem>mFRR</MenuItem>
                            <MenuItem>aFRR</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item p={1}>
                        <Typography className="label">Start of delivery:</Typography>
                        <TextField type="date" sx={{ m: 1, minWidth: 250 }}/>
                    </Grid>
                </Grid>
                <Grid item container xs={12} md={6} p={1}
                direction="column"
                justifyContent="center"
                alignItems="flex-start">
                    <Grid item p={1}>
                        <Typography className="label">Quantity:</Typography>
                        <TextField type="text" sx={{ m: 1, minWidth: 250 }} InputProps={{ endAdornment: <InputAdornment position="end">MW</InputAdornment>}}/>
                    </Grid>
                    <Grid item p={1}>
                        <Typography className="label">Localization:</Typography>
                        <TextField type="text" InputProps={{ startAdornment: <InputAdornment position="start">Zone:</InputAdornment>}} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid p={1} item container direction="column" justifyContent="center" alignItems="center">
                    <Link className="link" to="/cftList">
                        <Button variant="contained">
                            <SaveIcon/>
                            Submit
                        </Button>
                    </Link>
                </Grid>
        </Grid>
    </Paper>
    </Grid>
  );
}