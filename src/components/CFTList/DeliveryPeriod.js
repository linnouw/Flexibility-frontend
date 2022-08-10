import React from 'react';
// @components
import DeliveryPeriodItem from './DeliveryPeriodItem';
// @MUI
import {Grid , Typography , Button , Dialog , DialogTitle , DialogContent , DialogActions} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useLocation} from 'react-router-dom';
// style
import '../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import CFT_contract from "../../abi/CFT.json";
import FlexibilityDP_contract from "../../abi/FlexibilityDP.json";
//useContext
import Web3Context from "../../Web3Context";
import PropTypes from "prop-types";

DeliveryPeriod.propTypes = {
  address: PropTypes.string,
  cftDetails: PropTypes.array,
};

export default function DeliveryPeriod() {
  const context = React.useContext( Web3Context);
  const [ latestDP , setLatestDP] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [ARL, setARL] = React.useState([]);
  const [MOL, setMOL] = React.useState([]);
  const [AO, setAO] = React.useState([]);
  const { projectUrl } = context;
  const data = useLocation();
  const DP_DURATION = 300000;
  const GCT = 60000;  

  const load = async(date) => {
    
    const start_dp = date-DP_DURATION;
    const end_dp = date-GCT;

    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    const CFT = new web3.eth.Contract(
      CFT_contract.abi,
      data.state.address
    );
    const gasPrice = await web3.eth.getGasPrice();
    const gas_setCurrentARL = await CFT.methods.setCurrentARL( start_dp , end_dp ).estimateGas();
    const gas_setCurrentMOL = await CFT.methods.setCurrentMOL( start_dp , end_dp ).estimateGas();

    const tx_arl = await CFT.methods.setCurrentARL( start_dp , end_dp ).send({ from: accounts[0] , gas : gas_setCurrentARL , gasPrice : gasPrice })
      .then(( resp ) => console.log(resp))
      .catch(( err ) => console.log(err));
    
    const gas_filter = await CFT.methods.filter().estimateGas();
    const tx_filter = await CFT.methods.filter().send({ from: accounts[0] , gas : gas_filter , gasPrice : gasPrice })
    .then(( resp ) => console.log(resp))
    .catch(( err ) => console.log(err));

    const tx_mol = await CFT.methods.setCurrentMOL( start_dp , end_dp ).send({ from: accounts[0] , gas : gas_setCurrentMOL , gasPrice : gasPrice })
      .then(( resp ) => console.log(resp))
      .catch(( err ) => console.log(err));

    const gas_createDP = await CFT.methods.createFlexibilityDP().estimateGas();
    const tx_dp = await CFT.methods.createFlexibilityDP().send({ from: accounts[0] , gas : gas_createDP , gasPrice : gasPrice })
      .then(( resp ) => console.log(resp))
      .catch(( err ) => console.log(err));
    const dp = await CFT.methods.getLatestDP().call();
    setLatestDP(dp);
    
  }

  const generate = async(latestDP) => {
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();
    const accounts = await web3.eth.getAccounts();
    const DP = new web3.eth.Contract(
      FlexibilityDP_contract.abi,
      latestDP
    );
    const arl = await DP.methods.getARL().call();
    setARL(Object.values(arl));
    const mol = await DP.methods.getMOL().call();
    setMOL(Object.values(mol));
    const gas_dispatch = await DP.methods.dispatch().estimateGas();
    const gasPrice = await web3.eth.getGasPrice();
    const tx = await DP.methods.dispatch().send({from : accounts[0] , gas : gas_dispatch , gasPrice : gasPrice})
      .then(( resp ) => console.log(resp))
      .catch(( err ) => console.log(err));
    const ao = await DP.methods.getAllActivationOrders().call();
    setAO(Object.values(ao));
    console.log(arl);
    console.log(mol);
    console.log(ao);
  }

  const handleOpen = async(latestDP) => {
    generate(latestDP);
    setOpen(true);
  } 

  const handleClose = () => {
    setOpen(false);
  } 

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
            <Typography variant="h5" className="title">Delivery Periods results</Typography>
            </Grid>
        </Grid>
        <Button onClick={() => load(1660144800000)}>click</Button>
        <Button onClick={() => handleOpen(latestDP)}>Open</Button>

        <DeliveryPeriodItem latestDP = {latestDP} closeModal={handleClose} open={open} />
    </Grid>
  );
}