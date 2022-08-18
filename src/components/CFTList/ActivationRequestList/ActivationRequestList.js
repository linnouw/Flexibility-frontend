import React from 'react';
// @MUI
import { Typography , Grid , TableContainer , Table , TableRow , TableCell , TableBody , TableHead , Paper , Button} from '@mui/material';
// style
import '../../../App.css';
import PropTypes from "prop-types";
//web3
import Web3 from "web3/dist/web3.min.js";
import ActivationRequest_contract from "../../../abi/ActivationRequest.json";
//useContext
import Web3Context from "../../../Web3Context";

ARL.propTypes = {
    ARLAddr: PropTypes.array,
  };

export default function ARL(ARLAddr) {
    const context = React.useContext( Web3Context);
    const { projectUrl } = context;
    const [rows, setRows] = React.useState([]);

    const createARL = async(address) => {     

        const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
        const networkId = await web3.eth.net.getId();
        const ARL = new web3.eth.Contract(
            ActivationRequest_contract.abi,
            address
        );
        const owner = await ARL.methods.getOwner().call();
        const quantity = await ARL.methods.getQuantity().call();
        const stat = await ARL.methods.getStatus().call();
        return [address , owner , quantity , stat];

    }

    React.useEffect(() => {

        async function load() {
            const ARLRows = await Promise.all(
                (ARLAddr["ARLAddr"]).map(async(address) => {
                    return await createARL(address);
                })
            );
            setRows(ARLRows);
        }

        load();

    }, []);

    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500}} aria-label="simple table">
                    <Button onClick={() => console.log(ARLAddr)}>click</Button>
                    <TableHead>
                    <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Owner</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length !== 0 && rows && rows.map((row, index) => {
                            <TableRow  key={index}>
                            <TableCell scope = "row" component="th"><a href={`https://app.tryethernal.com/address/${row[0]}`} target="_blank" rel="noreferrer">{row[0]}</a></TableCell>
                            <TableCell><a href={`https://app.tryethernal.com/address/${row[1]}`} target="_blank" rel="noreferrer">{row[1]}</a></TableCell>
                            <TableCell>{row[2]}</TableCell>
                            <TableCell>{row[3]}</TableCell>
                        </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}