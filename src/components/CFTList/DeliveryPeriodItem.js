import React from 'react';
// components
import ActivationRequestList from './ActivationRequestList/ActivationRequestList';
import MeritOrderList from './MeritOrderList/MeritOrderList';
import ActivationOrders from './ActivationOrders/ActivationOrders';
// @MUI
import {Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button , Stack , Typography} from '@mui/material';
// style
import '../../App.css';
import PropTypes from "prop-types";

DeliveryPeriodItem.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.any,
    latestDP : PropTypes.string,
    ARLAddr : PropTypes.array,
    MOLAddr : PropTypes.array,
    AOAddr : PropTypes.array,
  };

export default function DeliveryPeriodItem({open , closeModal , latestDP,  ARLAddr , MOLAddr, AOAddr}){

    return (
    <Dialog
    open={open}
    onClose={closeModal} >
        <DialogTitle id="responsive-dialog-title" className="cftItem-text">
            Delivery period <a href={`https://app.tryethernal.com/address/${latestDP}`} target="_blank" rel="noreferrer">{latestDP}</a>
        </DialogTitle>
        <DialogContent>
            <Grid container direction="column"
                justifyContent="space-between"
                alignItems="center" >
                <Grid item mb={3}>
                    <Typography className="cftItem-text">Activation Requests List</Typography>
                    <ActivationRequestList ARLAddr={ARLAddr}/>
                </Grid>
                <Grid item  mb={3}>
                    <Typography className="cftItem-text">Merit Order List</Typography>
                    <MeritOrderList MOLAddr={MOLAddr} />
                </Grid>
                <Grid item  mb={3}>
                    <Typography className="cftItem-text">Activation Orders List</Typography>
                    <ActivationOrders AOAddr={AOAddr} />
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
        <Button onClick={closeModal} autoFocus>
            Close
        </Button>
        </DialogActions>
    </Dialog>
  );
}