import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';
// @MUI
import {Card, CardContent, Typography, CardActions, Button} from '@mui/material';
// style
import '../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import CFT_contract from "../../abi/CFT.json";
//useContext
import Web3Context from "../../Web3Context";

export default function CFTItem(address) {
  const context = React.useContext(Web3Context);
  const { projectUrl } = context;
  const [cftDetails, setCftDetails] = React.useState([]);
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    load();
  }, [cftDetails]);

  async function load() {
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    //interact with specific contract
    const CFT = new web3.eth.Contract(CFT_contract.abi, address["address"]);
    const cft_details = await CFT.methods.getCFTDetails().call();
    setCftDetails(Object.values(cft_details));
    const product = await CFT.methods.getProductName(cft_details[1]).call();
    setProduct(product);
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
    <Card sx={{ minWidth: 275 }} elevation={0} style={{borderRadius: 10}}>
    <CardContent>
      <Typography className="cftItem-text" sx={{ fontSize: 14 }} gutterBottom>
        00:00
      </Typography>
      <Typography className="cftItem-text" variant="h5" component="div">
        {product}
      </Typography>
      <Typography className="cftItem-text" sx={{ mb: 1.5 }}>
        Opening Time : {convert_Milliseconds_to_date(parseInt(cftDetails[3]))}
      </Typography>
      <Typography className="cftItem-text" sx={{ mb: 1.5 }}>
        Closing Time : {convert_Milliseconds_to_date(parseInt(cftDetails[4]))}
      </Typography>
      <Typography className="cftItem-text" variant="body2">
        {cftDetails[2]} MW
      </Typography>
      <Typography className="cftItem-text" variant="body2">
        Zone {cftDetails[5]}
      </Typography>
    </CardContent>
    <CardActions>
        <Link className="link" to={`/createAR`} state={{address, cftDetails}}>
            <Button size="small">Submit AR</Button>
        </Link>
        <Link className="link" to={`/createBid`} state={{address, cftDetails}}>
            <Button size="small">Submit Bid</Button>
        </Link>
        <Link className="link" to={`/ARL`} state={{}}>
            <Button size="small">View AR list</Button>
        </Link>
    </CardActions>
  </Card>
  );
}