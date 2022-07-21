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
import { Link } from "react-router-dom";
// style
import "../../App.css";
//web3
import Web3 from "web3/dist/web3.min.js";
//import FlexibilityList_contract from "../../abi/FlexibilityList.json";
//import { useWeb3React } from "@web3-react/core";
//import { injected } from "../../wallet/Connect";

export default function CreateCFT() {
  const [owner, setOwner] = React.useState(null);
  const [product, setProduct] = React.useState(null);
  const [powerNeeded, setPowerNeeded] = React.useState(null);
  const [openingDate, setOpeningDate] = React.useState(null);
  const [closingDate, setClosingDate] = React.useState(null);
  const [localization, setLocalization] = React.useState(null);

  const handleChange = (e) => {
    setProduct(e.target.value);
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
      .createProduct(
        owner,
        product,
        powerNeeded,
        openingDate,
        closingDate,
        localization
      )
      .estimateGas({ from: account });

    const gasPrice = await web3.eth.getGasPrice();

    const tx = await AuctionListContract.methods
      .createCFT(
        owner,
        product,
        powerNeeded,
        openingDate,
        closingDate,
        localization
      )
      .send({ from: account, gas, gasPrice })
      .then((response) => alert("successfully added"))
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
                <Typography className="label">Product:</Typography>
                <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="product"
                    value={product}
                    onChange={handleChange}
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
                  type="date"
                  sx={{ m: 1, minWidth: 250 }}
                  onChange={(e) => setOpeningDate(epoch(e.target.value))}
                />
              </Grid>
              <Grid item p={1}>
                <Typography className="label">Closing date:</Typography>
                <TextField
                  type="date"
                  sx={{ m: 1, minWidth: 250 }}
                  onChange={(e) => setClosingDate(epoch(e.target.value))}
                />
              </Grid>
              <Grid item p={1}>
                <Typography className="label">Localization Factor:</Typography>
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
              <Link className="link" to="/cftList">
                <Button variant="contained" onClick={handleSubmit}>
                  <PublishIcon />
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
