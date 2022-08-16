import React from 'react';
// @MUI
import {Grid , TableRow , TableCell } from '@mui/material';
// style
import '../../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import Bid_contract from "../../../abi/Bid.json";
//useContext
import Web3Context from "../../../Web3Context";
import PropTypes from "prop-types";

MOLItem.propTypes = {
    address: PropTypes.string,
  };

export default function MOLItem(address) {
    const context = React.useContext( Web3Context);
    const [ owner , setOwner ] = React.useState();
    const [ quantity , setQuantity ] = React.useState();
    const { projectUrl } = context;

    React.useEffect(() => {
        load();
    }, [projectUrl]);

    const load = async() => {
        const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
        const networkId = await web3.eth.net.getId();
        const ARL = new web3.eth.Contract(
            Bid_contract.abi,
            address
        );
        const _owner = await ARL.methods.getOwner().call();
        setOwner(_owner);
        const _quantity = await ARL.methods.getQuantity().call();
        setQuantity(_quantity);

    }

    return(
        <Grid>
            <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {address}
                    </TableCell>
                    <TableCell align="right">{owner}</TableCell>
                    <TableCell align="right">{quantity}</TableCell>
            </TableRow>
        </Grid>
    )
}