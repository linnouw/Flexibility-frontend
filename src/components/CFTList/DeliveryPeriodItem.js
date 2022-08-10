import React from 'react';
// components
import ActivationRequestList from './ActivationRequestList/ActivationRequestList';
import MeritOrderList from './MeritOrderList/MeritOrderList';
import ActivationOrders from './ActivationOrders/ActivationOrders';
// @MUI
import {Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
// style
import '../../App.css';
import PropTypes from "prop-types";

DeliveryPeriodItem.propTypes = {
    open: PropTypes.bool,
    closeModal: PropTypes.any,
    latestDP : PropTypes.string,
    ARL : PropTypes.array,
    MOL : PropTypes.array,
    AO : PropTypes.array,
  };

export default function DeliveryPeriodItem({open , closeModal , latestDP,  ARL , MOL , AO}){

    return (
    <Dialog
    open={open}
    onClose={closeModal}>
        <DialogTitle id="responsive-dialog-title" className="cftItem-text">
            Delivery period {latestDP}
        </DialogTitle>
        <DialogContent>
            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                <ActivationRequestList ARL={ARL}/>
                </Grid>
                <Grid item>
                    <MeritOrderList MOL={MOL} />
                </Grid>
                <Grid item>
                    <ActivationOrders AO={AO} />
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