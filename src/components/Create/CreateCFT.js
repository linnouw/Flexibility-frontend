import React from 'react';
// @MUI
import {Grid, Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment} from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import {Link} from 'react-router-dom';
// style
import '../../App.css';

export default function CreateCFT() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="components-background">
        <Paper elevation={0} style={{borderRadius: 10, padding:10}}>
            <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
                <Grid item p={1}>
                    <Typography variant="h6" className="form-title">Open a call for tenders</Typography>
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
                            <Typography className="label">Total power needed:</Typography>
                            <TextField type="text" sx={{ m: 1, minWidth: 250 }} InputProps={{ endAdornment: <InputAdornment position="end">MW</InputAdornment>}}/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} p={1}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start">
                        <Grid item p={1}>
                            <Typography className="label">Opening date:</Typography>
                            <TextField type="date" sx={{ m: 1, minWidth: 250 }}/>
                        </Grid>
                        <Grid item p={1}>
                            <Typography className="label">Duration:</Typography>
                            <TextField type="number"  sx={{ m: 1, minWidth: 250 }} InputProps={{ inputProps: { min: 0 }, endAdornment: <InputAdornment position="end">Min</InputAdornment>}}/>
                        </Grid>
                        <Grid item p={1}>
                            <Typography className="label">Localization Factor:</Typography>
                            <TextField type="text" InputProps={{ startAdornment: <InputAdornment position="start">Zone:</InputAdornment>}} />
                        </Grid>
                    </Grid>
                    <Grid p={1} item container direction="column" justifyContent="center" alignItems="center">
                        <Link className="link" to="/cftList">
                            <Button variant="contained">
                                <PublishIcon/>
                                Open
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Grid>
  );
}