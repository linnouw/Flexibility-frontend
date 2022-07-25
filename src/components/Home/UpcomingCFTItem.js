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
  const { projectUrl } = context;
  const [cftDetails, setCftDetails] = React.useState([]);

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

  const convert_Milliseconds_to_date = (time) => {
   
    const date = new Date(time);
    return (date.toLocaleString());

  }

  const millisToMinutesAndSeconds = (milliseconds) => {
    //Get hours from milliseconds
    let hours = milliseconds / (1000*60*60);
    let absoluteHours = Math.floor(hours);
    let h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

    //Get remainder from hours and convert to minutes
    let minutes = (hours - absoluteHours) * 60;
    let absoluteMinutes = Math.floor(minutes);
    let m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    let seconds = (minutes - absoluteMinutes) * 60;
    let absoluteSeconds = Math.floor(seconds);
    let s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


    return h + ':' + m + ':' + s;
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
            <Typography className="product-item-title" noWrap>{convert_Milliseconds_to_date(parseInt(cftDetails[3]))}</Typography>
            </Grid>
            <Grid item>
            <Typography className="product-item-title" noWrap>product</Typography>
            </Grid>
       </Grid>
       <Grid xs={12} md={6} item container direction="column"
            justifyContent="center"
            alignItems="flex-start"
            p={2}>
            <Grid item>
                <Typography className="product-item-title" noWrap>Total power : {cftDetails[2]} MW</Typography>
            </Grid>
            <Grid item>
                <Typography className="product-item-title">Duration : {millisToMinutesAndSeconds(parseInt(cftDetails[4]) - parseInt(cftDetails[3]))}</Typography>
            </Grid>
            <Grid item>
                <Typography className="product-item-title" noWrap>Localization : {cftDetails[5]}</Typography>
            </Grid>
       </Grid>
       
    </Stack>
  );
}