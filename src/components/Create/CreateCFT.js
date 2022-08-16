import React from "react";
// @MUI
import {
  Grid,
  Button,
  Typography,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
// @react-router
import { useNavigate } from "react-router-dom";
// style
import "../../App.css";
//web3
import Web3 from "web3/dist/web3.min.js";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/Connect";
import FlexibilityList_contract from "../../abi/FlexibilityList.json";
//useContext
import Web3Context from "../../Web3Context";

export default function CreateCFT() {
  const navigate = useNavigate();
  const context = React.useContext(Web3Context);
  const { projectUrl, productsAddresses, setCFTAddresses } = context;
  const [powerNeeded, setPowerNeeded] = React.useState(null);
  const [openingDate, setOpeningDate] = React.useState(null);
  const [closingDate, setClosingDate] = React.useState(null);
  const [localization, setLocalization] = React.useState(null);
  const [value, setValue] = React.useState("");

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
    
  const setProduct = (value) => {
    
    if (value === "mFRR") 
      return(productsAddresses[0]);
    else return(productsAddresses[1]);
  };

  const epoch = (date) => {
    return Date.parse(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();
    const FlexibilityList = new web3.eth.Contract(
      FlexibilityList_contract.abi,
      FlexibilityList_contract.networks[networkId].address
    );

    const gas = await FlexibilityList.methods
      .createCFT(
        accountAddress,
        setProduct(value),
        powerNeeded,
        openingDate,
        closingDate,
        localization
      )
      .estimateGas({ from: accountAddress });

    const gasPrice = await web3.eth.getGasPrice();

    const tx = await FlexibilityList.methods
      .createCFT(
        accountAddress,
        setProduct(value),
        powerNeeded,
        openingDate,
        closingDate,
        localization
      )
      .send({ from: accountAddress, gas, gasPrice })
      .then((response) => {
        alert("successfully added");
        setCFTAddresses([]);
        navigateToCftList();
      })
      .catch((err) => alert(err));
    

  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className="components-background"
    >
      <Paper elevation={0} style={{ borderRadius: 10, padding: 10 }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item p={1}>
            <Typography variant="h6" className="form-title">
              Open a call for tenders
            </Typography>
          </Grid>
          {isConnected ? (
            <Grid
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
                  <Typography className="label">Product:</Typography>
                  <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      label="product"
                      value={value}
                      onChange={(e)=>setValue(e.target.value)}
                    >
                      <MenuItem value={"mFRR"}>mFRR</MenuItem>
                      <MenuItem value={"aFRR"}>aFRR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item p={1}>
                  <Typography className="label">Total power needed:</Typography>
                  <TextField
                    type="text"
                    sx={{ m: 1, minWidth: 250 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">MW</InputAdornment>
                      ),
                    }}
                    onChange={(e) => setPowerNeeded(parseInt(e.target.value))}
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
                  <Typography className="label">Opening date:</Typography>
                  <TextField
                    type="datetime-local"
                    sx={{ m: 1, minWidth: 250 }}
                    onChange={(e) =>
                      setOpeningDate(epoch(e.target.value))
                    }
                  />
                </Grid>
                <Grid item p={1}>
                  <Typography className="label">Closing date:</Typography>
                  <TextField
                    type="datetime-local"
                    sx={{ m: 1, minWidth: 250 }}
                    onChange={(e) =>
                      setClosingDate(epoch(e.target.value))
                    }
                  />
                </Grid>
                <Grid item p={1}>
                  <Typography className="label">
                    Localization Factor:
                  </Typography>
                  <TextField
                    type="text"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Zone:</InputAdornment>
                      ),
                    }}
                    onChange={(e) => setLocalization(e.target.value)}
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
                    <PublishIcon />
                    Open
                  </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid
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
            </Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}
