import React from 'react';
// components
import BarChart from './BarChart';
import ActivationOrderChart from './ActivationOrderChart';
// @MUI
import {Grid, Typography} from '@mui/material';
// style
import '../../App.css';

export default function Dashboard() {

  const MOLborderColor = 'rgb(55,128,156)';
  const MOLbackgroundColor = 'rgb(55,128,156, 0.5)';

  const ARborderColor = 'rgb(132,133,140)';
  const ARbackgroundColor = 'rgb(132,133,140, 0.5)';

  const MOLlabels=["Bid4:price4", "Bid3: price3", "Bid2: price2", "Bid1: price1"];
  const MOLdatas = ["20", "30","20", "30"];

  const ARlabels=["AR2:price2", "AR1: price1"];
  const ARdatas = ["20", "11"];

  const AOlabels=["AO2: Aggreg2/Price2", "AO1: Aggreg1/Price1"];
  const AOdatas=["40", "12"];

  return (
    <Grid container className = "components-background" direction="row" justifyContent="flex-start" alignItems="flex-start">
     <Grid item m={1}>
        <Typography variant = "h5" className = "title">Dashboard</Typography>
      </Grid>
      <Grid item m={1} container direction={{md:"row", xs:"column"}} justifyContent="flex-start" alignItems="flex-start">
        <Grid item m={1}>
          <BarChart title={"Merit Order List"} labels={MOLlabels} datas={MOLdatas}  borderColor={MOLborderColor} backgroundColor={MOLbackgroundColor}/>
        </Grid>
        <Grid item m={1}>
          <BarChart title={"Activation Request List"} labels={ARlabels} datas={ARdatas} borderColor={ARborderColor} backgroundColor={ARbackgroundColor}/>
        </Grid>
      </Grid>
      <Grid item m={1}>
        <ActivationOrderChart labels={AOlabels} datas={AOdatas}/>
  </Grid>
    </Grid>
  );

}