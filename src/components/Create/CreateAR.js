import React from "react";
// components

// @MUI
import {
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// @react-router
import { Link, useNavigate, useLocation} from "react-router-dom";
// style
import "../../App.css";
//web3
import Web3 from "web3/dist/web3.min.js";
import CFT_contract from "../../abi/CFT.json";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/Connect";
//useContext
import Web3Context from "../../Web3Context";
import PropTypes from "prop-types";

CreateAR.propTypes = {
  address: PropTypes.string,
  cftDetails: PropTypes.array,
  };

export default function CreateAR() {
  const navigate = useNavigate();
  const data = useLocation();
  const context = React.useContext(Web3Context);
  const { projectUrl } = context;
  const [quantity, setQuantity] = React.useState(null);
  const [startOfDelivery, setStartOfDelivery] = React.useState(null);

  const navigateToCftList = () => {
    navigate('/cftList');
  }

  const [haveMetamask, sethaveMetamask] = React.useState(true);
  const [accountAddress, setAccountAddress] = React.useState('');
  const [isConnected, setIsConnected] = React.useState(false);

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };
    
  const epoch = (date) => {
    return Date.parse(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();
    const CFT = new web3.eth.Contract(
      CFT_contract.abi,
      data.state.address
    );

    const gas = await CFT.methods
      .createActivationRequest(accountAddress, quantity, startOfDelivery)
      .estimateGas({ from: accountAddress });

    const gasPrice = await web3.eth.getGasPrice();

    const tx = await CFT.methods
      .createActivationRequest(accountAddress, quantity, startOfDelivery)
      .send({ from: accountAddress, gas, gasPrice })
      .then((response) => {alert("successfully added");
      navigateToCftList();})
      .catch((err) => alert(err));
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      className="components-background"
    >
      <Grid
        item
        m={1}
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Link className="link" to="/cftList">
          <Button variant="text">
            <ArrowBackIcon />
            Back to CFT list
          </Button>
        </Link>
      </Grid>
      <Paper elevation={0} style={{ borderRadius: 10, padding: 10 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item p={1}>
            <Typography variant="h6" className="form-title">
              Submit an activation request
            </Typography>
          </Grid>
          {isConnected ? (<Grid
            item
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              md={6}
              p={1}
              container
              direction="column"
              justifyContent="center"
              alignItems={{ md: "flex-end", xs: "flex-start" }}
            >
              <Grid item p={1}>
                <Typography className="label">Owner:</Typography>
                <TextField
                  type="text"
                  sx={{ m: 1, minWidth: 250 }}
                  value={accountAddress}
                  disabled
                />
              </Grid>
              <Grid item p={1}>
                <Typography className="label">Start of delivery:</Typography>
                <TextField
                  type="datetime-local"
                  sx={{ m: 1, minWidth: 250 }}
                  onChange={(e) => setStartOfDelivery(epoch(e.target.value))}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={6}
              p={1}
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
            >
              <Grid item p={1}>
                <Typography className="label">Quantity:</Typography>
                <TextField
                  type="text"
                  sx={{ m: 1, minWidth: 250 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">MW</InputAdornment>
                    ),
                  }}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item p={1}>
                <Typography className="label">Localization: {data.state.localization}</Typography>
                <TextField
                  type="text"
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Zone: {data.state.cftDetails[5]}</InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          
          <Grid
            p={1}
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
              <Button variant="contained" onClick={handleSubmit}>
                <SaveIcon />
                Submit
              </Button>
          </Grid>
          </Grid>)
          :(<Grid
              item
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button variant="contained" onClick={connectWallet}>
                <AccountBalanceWalletOutlinedIcon/>
                Connect
              </Button>
            </Grid>)}
        </Grid>
      </Paper>
    </Grid>
  );
}
