import React from 'react';
// @MUI
import {Typography} from '@mui/material';
import PropTypes from "prop-types";

Timer.propTypes = {
    closingTime: PropTypes.number
  };

export default function Timer({closingTime}) {
    const [time, setTime] = React.useState("");
    const [end, setEnd] = React.useState(closingTime);

    React.useEffect(()=>{
        const x = setInterval(()=>{
            const now = new Date().getTime();
            const distance = closingTime - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTime(days + ":" + hours + ":" + minutes + ":" + seconds);
        } , 1000);
    }, [] ); 

    return(
        <Typography className="cftItem-text" sx={{ fontSize: 14 }}>
            {time}
        </Typography>
    );

}
