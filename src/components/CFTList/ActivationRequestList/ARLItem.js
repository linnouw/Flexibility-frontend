import React from 'react';
// @MUI
import {Grid , TableRow , TableCell } from '@mui/material';
// style
import '../../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import ActivationRequest_contract from "../../../abi/ActivationRequest.json";
//useContext
import Web3Context from "../../../Web3Context";
import PropTypes from "prop-types";

ARLItem.propTypes = {
    address: PropTypes.string,
  };

export default function ARLItem(address) {
    const context = React.useContext( Web3Context);
    const [ owner , setOwner ] = React.useState();
    const [ stat , setStat ] = React.useState();
    const [ quantity , setQuantity ] = React.useState();
    const { projectUrl } = context;

    React.useEffect(() => {
        load();
    }, [projectUrl]);

    const load = async() => {
        const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
        const networkId = await web3.eth.net.getId();
        const ARL = new web3.eth.Contract(
            ActivationRequest_contract.abi,
            address
        );
        const _owner = await ARL.methods.getOwner().call();
        setOwner(_owner);
        const _quantity = await ARL.methods.getQuantity().call();
        setQuantity(_quantity);
        const _stat = await ARL.methods.getState().call();
        setStat(_stat);

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
                    <TableCell align="right">{stat}</TableCell>
            </TableRow>
        </Grid>
    )
}