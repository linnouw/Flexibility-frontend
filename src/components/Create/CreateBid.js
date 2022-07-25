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
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate} from "react-router-dom";
// style
import "../../App.css";
//web3
import Web3 from "web3/dist/web3.min.js";
import CFT_contract from "../../abi/FlexibilityList.json";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/Connect";
//useContext
import Web3Context from "../../Web3Context";

export default function CreateBid(address) {
  const navigate = useNavigate();
  const context = React.useContext(Web3Context);
  const { projectUrl } = context;
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [owner, setOwner] = React.useState(null);
  const [serviceProvider, setServiceProvider] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [quantity, setQuantity] = React.useState(null);
  const [localization, setLocalization] = React.useState("");
  const [startOfDelivery, setStartOfDelivery] = React.useState(null);

  const navigateToCftList = () => {
    navigate('/cftList');
  }

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  const epoch = (date) => {
    return Date.parse(date);
  };

  const handleChange = (e) => {
    setLocalization(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();
    const CFT = new web3.eth.Contract(
      CFT_contract.abi,
      address
    );

    const gas = await CFT.methods
      .createBid(
        owner,
        serviceProvider,
        price,
        quantity,
        localization,
        startOfDelivery
      )
      .estimateGas({ from: account });

    const gasPrice = await web3.eth.getGasPrice();

    const tx = await CFT.methods
      .createBid(
        owner,
        serviceProvider,
        price,
        quantity,
        localization,
        startOfDelivery
      )
      .send({ from: account, gas, gasPrice })
      .then((response) => alert("successfully added"))
      .catch((err) => alert(err));
      navigateToCftList();
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
              Submit a bid
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
                <Typography className="label">Service provider:</Typography>
                <TextField
                  type="text"
                  sx={{ m: 1, minWidth: 250 }}
                  onChange={(e) => setServiceProvider(e.target.value)}
                />
              </Grid>
              <Grid item p={1}>
                <Typography className="label">Price:</Typography>
                <TextField
                  type="text"
                  sx={{ m: 1, minWidth: 250 }}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
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
                <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="localization"
                    value={localization}
                    onChange={handleChange}
                  >
                    <MenuItem value={"*"}>*</MenuItem>
                    <MenuItem value={"A"}>{}</MenuItem>
                  </Select>
                </FormControl>
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
        </Grid>
      </Paper>
    </Grid>
  );
}
