import React from "react";
// components

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
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
// style
import "../../App.css";
//web3
import Web3 from "web3/dist/web3.min.js";
//import CFT_contract from "../../abi/FlexibilityList.json";
//import { useWeb3React } from "@web3-react/core";
//import { injected } from "../../wallet/Connect";

export default function CreateAR() {
  const [owner, setOwner] = React.useState(null);
  const [quantity, setQuantity] = React.useState(null);
  const [startOfDelivery, setStartOfDelivery] = React.useState(null);

  const epoch = (date) => {
    return Date.parse(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();
    const CFT = new web3.eth.Contract(
      CFT_contract.abi,
      CFT_contract.networks[networkId].address
    );

    const gas = await CFT.methods
      .createActivationRequest(owner, quantity, startOfDelivery)
      .estimateGas({ from: account });

    const gasPrice = await web3.eth.getGasPrice();

    const tx = await CFT.methods
      .createAuctions(owner, quantity, startOfDelivery)
      .send({ from: account, gas, gasPrice })
      .then((response) => alert("successfully added"))
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
                  onChange={(e) => setOwner(e.target.value)}
                />
              </Grid>
              <Grid item p={1}>
                <Typography className="label">Start of delivery:</Typography>
                <TextField
                  type="date"
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
                <Typography className="label">Localization:</Typography>
                <TextField
                  type="text"
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Zone:</InputAdornment>
                    ),
                  }}
                />
              </Grid>
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
            <Link className="link" to="/cftList">
              <Button variant="contained" onClick={handleSubmit}>
                <SaveIcon />
                Submit
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
