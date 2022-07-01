import React from 'react';
// @MUI
import {Paper, Grid, Typography, Stack} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimelapseIcon from '@mui/icons-material/Timelapse';
// style
import '../../App.css';

export default function Overview() {
  return (
    <Grid container
        direction={{md:"column", xs:"row"}}
        justifyContent="center"
        alignItems="flex-start">
        <Grid item m={1}>
            <Paper elevation={0} style={{borderRadius: 10}}>
                <Stack direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                p={2}>
                    <AccessTimeIcon/>
                    <Grid item container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                        <Grid item>
                            <Typography className="phrase">Current delivery period</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" className="count">10:20</Typography>
                        </Grid>
                    </Grid>
                </Stack>
            </Paper>
        </Grid>
        <Grid item m={1}>
            <Paper elevation={0} style={{borderRadius: 10}}>
                <Stack direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    p={2}>
                    <TimelapseIcon/>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start">
                        <Grid item>
                            <Typography className="phrase">Delivery period duration</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" className="count">10 mins</Typography>
                        </Grid>
                    </Grid>
               </Stack>
            </Paper>
        </Grid>
    </Grid>
    );
}