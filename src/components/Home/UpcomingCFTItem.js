import React from 'react';
// @MUI
import { Grid, Typography, Divider, Stack} from '@mui/material';
// style
import '../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import CFT_contract from "../../abi/CFT.json";
//useContext
import Web3Context from "../../Web3Context";

export default function UpcomingCFTItem(address) {
  const context = React.useContext(Web3Context);
  const { projectUrl, productsAddresses } = context;
  const [cftDetails, setCftDetails] = React.useState([]);

  const convert = (epoch_time) => {
    const date = new Date(epoch_time*1000);
    return date.toLocaleString();
  }

  React.useEffect(() => {
    load();
  }, [cftDetails]);

  async function load() {
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    //interact with specific contract
    const CFT = new web3.eth.Contract(CFT_contract.abi, address["address"]);
    const cft_details = await CFT.methods.getCFTDetails().call();
    setCftDetails(Object.values(cft_details));
  }

  return (
    <Stack
    direction="row"
    divider={<Divider className="colored-divider" orientation="vertical" flexItem />}
    p={2}
  >
       <Grid xs={12} md={6} item container  direction="column"
            justifyContent="center"
            alignItems="flex-end"
            p={2}>
            <Grid item>
                <Typography className="product-item-title" noWrap>{convert(cftDetails[3])}</Typography>
            </Grid>
            <Grid item>
            <Typography className="product-item-title" noWrap></Typography>
            </Grid>
       </Grid>
       <Grid xs={12} md={6} item container direction="column"
            justifyContent="center"
            alignItems="flex-start"
            p={2}>
            <Grid item>
                <Typography className="product-item-title" noWrap>Total power : {cftDetails[2]}</Typography>
            </Grid>
            <Grid item>
                <Typography className="product-item-title">Duration : {cftDetails[4] - cftDetails[3]}</Typography>
            </Grid>
            <Grid item>
                <Typography className="product-item-title" noWrap>Localization : {cftDetails[5]}</Typography>
            </Grid>
       </Grid>
       
    </Stack>
  );
}