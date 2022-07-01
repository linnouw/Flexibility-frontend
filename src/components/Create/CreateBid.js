import React from 'react';
// @MUI
import {Grid, Button, Typography, Paper, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
// style
import '../../App.css';

export default function CreateCFT() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" className="components-background" p={1}>
        <Paper elevation={0} style={{borderRadius: 10, padding: 10}}>
            <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
                <Grid item p={1}>
                    <Typography variant="h6" className="form-title">Submit a bid</Typography>
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
                            <Typography className="label">Service provider:</Typography>
                            <TextField type="text" sx={{ m: 1, minWidth: 250 }}/>
                        </Grid>
                        <Grid item p={1}>
                            <Typography className="label">Price:</Typography>
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
                        <Grid item p={1}>
                            <Typography className="label">Start of delivery:</Typography>
                            <TextField type="date" sx={{ m: 1, minWidth: 250 }}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid p={1} item container direction="column" justifyContent="center" alignItems="center">
                        <Button variant="contained">
                            <SaveIcon/>
                            Submit
                        </Button>
                    </Grid>
            </Grid>
        </Paper>
    </Grid>
  );
}