import React from 'react';
// @MUI
import { Grid, TableContainer , Table , TableRow , TableCell , TableBody , TableHead, Paper } from '@mui/material';
// style
import '../../../App.css';
import PropTypes from "prop-types";
//web3
import Web3 from "web3/dist/web3.min.js";
import Bid_contract from "../../../abi/Bid.json";
//useContext
import Web3Context from "../../../Web3Context";

MOL.propTypes = {
    MOLAddr: PropTypes.array,
  };

export default function MOL(MOLAddr) {
    const context = React.useContext( Web3Context);
    const { projectUrl } = context;
    const [rows, setRows] = React.useState([]);

    const createMOL = async(address) => {     

        const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
        const networkId = await web3.eth.net.getId();
        const MOL = new web3.eth.Contract(
            Bid_contract.abi,
            address
        );
        const owner = await MOL.methods.getOwner().call();
        const quantity = await MOL.methods.getQuantity().call();
        return [address , owner , quantity ];

    }

    React.useEffect(() => {

        async function load() {
            const MOLRows = await Promise.all(
                (MOLAddr["MOLAddr"]).map(async(address) => {
                    return await createMOL(address);
                })
            );
            setRows(MOLRows);
        }

        load();

    }, []);

    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.length !== 0 && rows && rows.map((row, index) => 
                        <TableRow
                        key={index}
                        >
                            <TableCell component="th" scope="row">
                            <a href={`https://app.tryethernal.com/address/${row[0]}`} target="_blank" rel="noreferrer">{row[0]}</a>
                            </TableCell>
                            <TableCell align="right"><a href={`https://app.tryethernal.com/address/${row[1]}`} target="_blank" rel="noreferrer">{row[1]}</a></TableCell>
                            <TableCell align="right">{row[2]}</TableCell>
                        </TableRow>
                        
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}