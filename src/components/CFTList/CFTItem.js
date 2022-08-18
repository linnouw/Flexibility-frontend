import React from 'react';
// components
import DeliveryPeriod from './DeliveryPeriod';
import {
    BrowserRouter as Router,
    Link,
  } from 'react-router-dom';
// @components
import Timer from "./Timer";
// @MUI
import {Grid, Card, CardContent, Typography, CardActions, Button} from '@mui/material';
// style
import '../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import CFT_contract from "../../abi/CFT.json";
//useContext
import Web3Context from "../../Web3Context";
import PropTypes from "prop-types";

CFTItem.propTypes = {
  address: PropTypes.string
};

export default function CFTItem({address}) {
  const context = React.useContext(Web3Context);
  const { projectUrl } = context;
  const [cftDetails, setCftDetails] = React.useState([]);
  const [product, setProduct] = React.useState();
  const [closingTime, setClosingTime] = React.useState();
  const [now, setNow] = React.useState();
  const [open ,setOpen] = React.useState(false);
  const [ dps , setDPs ] = React.useState([]);

  const handleOpen = () => {
    
    defineDP();
    setOpen(true);
  }

  const handleClose = () => {

    setOpen(false);
  }


  React.useEffect(() => {
    load();
  }, [cftDetails]);

  async function load() {

    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    //interact with specific contract
    const CFT = new web3.eth.Contract(CFT_contract.abi, address);
    const cft_details = await CFT.methods.getCFTDetails().call();
    setCftDetails(Object.values(cft_details));
    const product_name = await CFT.methods.getProductName(cft_details[1]).call();
    setProduct(product_name);
    const time = parseInt(cftDetails[4]);
    setClosingTime(time);
    const now_time = Date.now();
    setNow(now_time);
    

  }

  const convert_Milliseconds_to_date = (time) => {
   
    const date = new Date(time);
    return (date.toLocaleString());

  }

  const defineDP = () => {
    let definedDps = [];
    for (var i = parseInt(cftDetails[3]); i <= parseInt(cftDetails[4]) ; i+=60000){
      const date = new Date(i);
      const minutes = date.getMinutes();
      if ( minutes % 5 === 0){
        definedDps.push(i);
      }
    }
    setDPs(definedDps);
  }

  return (

    <Card sx={{ minWidth: 275 }} elevation={0} style={{borderRadius: 10}}>
    <CardContent>
      {/*<Timer closingTime={closingTime} />*/}
      <Typography className="cftItem-text" sx={{ mb: 1.5 }}>
        CFT Block address <a href={`https://app.tryethernal.com/address/${address}`} target="_blank" rel="noreferrer">{address}</a>
      </Typography>
      <Typography className="cftItem-text" sx={{ mb: 1.5 }}>
        Owner address <a href={`https://app.tryethernal.com/address/${cftDetails[0]}`} target="_blank" rel="noreferrer">{cftDetails[0]}</a>
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
          {closingTime > now ? 
          (<>
            <Link className="link" to={`/createAR`} state={{address, cftDetails}}>
                <Button size="small">Submit AR</Button>
            </Link>
            <Link className="link" to={`/createBid`} state={{address, cftDetails}}>
                <Button size="small">Submit Bid</Button>
            </Link>
          </>) : (
            <>
              <Button disabled size="small">Submit AR</Button>
              <Button disabled size="small">Submit Bid</Button>
            </>
          )}
          <Button size="small" onClick={handleOpen}>View results</Button>
          <DeliveryPeriod openModal={open} closeModal={handleClose} address={ address } dps={ dps }/>
    </CardActions>
  </Card>

  );
}