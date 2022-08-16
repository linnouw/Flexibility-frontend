import React from 'react';
// @MUI
import { Grid, TableContainer , Table , TableRow , TableCell , TableBody , TableHead, Paper, Button } from '@mui/material';
// style
import '../../../App.css';
//web3
import Web3 from "web3/dist/web3.min.js";
import NFT_contract from "../../../abi/NFT.json";
//useContext
import Web3Context from "../../../Web3Context";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../wallet/Connect";

AO.propTypes = {
    AOArray: PropTypes.array,
  };

export default function AO(AOArray) {
    
    const context = React.useContext(Web3Context);
    const { projectUrl } = context;

    const [haveMetamask, sethaveMetamask] = React.useState(true);
    const [accountAddress, setAccountAddress] = React.useState('');
    const [isConnected, setIsConnected] = React.useState(false);

    const { ethereum } = window;

    const connectWallet = async () => {
        try {
        if (!ethereum) {
            sethaveMetamask(false);
        }
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
        });
        setAccountAddress(accounts[0]);
        setIsConnected(true);
        } catch (error) {
        setIsConnected(false);
        }
    };

    const mint = async( aROwner , bidOwner , quantity) => {
        const tokenURI = `to : ${aROwner} from : ${bidOwner} quantity : ${quantity}`;
        const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
        const networkId = await web3.eth.net.getId();
        const NFT = new web3.eth.Contract(
            NFT_contract.abi,
            NFT_contract.networks[networkId].address
          );
        const gas = await NFT.methods
        .mintToken( aROwner , tokenURI )
        .estimateGas({ from: accountAddress });

        const gasPrice = await web3.eth.getGasPrice();

        const tx = await NFT.methods.mintToken( aROwner , tokenURI )
            .send({ from: accountAddress, gas, gasPrice })
            .then(() => {alert("NFT Minted !")})
            .catch((err) => alert(err));
    }

    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>AR Owner</TableCell>
                            <TableCell align="right">Bid Owner</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">-</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Array.from(AOArray).map((ao, index) => {
                        <Grid key={index}>
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                <a href={`https://app.tryethernal.com/address/${ao[0]}`} target="_blank" rel="noreferrer">{ao[0]}</a>
                                </TableCell>
                                <TableCell align="right"><a href={`https://app.tryethernal.com/address/${ao[1]}`} target="_blank" rel="noreferrer">{ao[1]}</a></TableCell>
                                <TableCell align="right">{ao[2]}</TableCell>
                                <TableCell>
                                    {isConnected ? 
                                        (accountAddress == ao[0] ?
                                            (<Button onClick={() => mint( ao[0] , ao[1] , ao[2] )}>Mint Token</Button>)
                                            :(<Button disabled>Mint Token</Button>))
                                    :(<Button onClick={connectWallet}>Connect wallet</Button>)}
                                </TableCell>
                            </TableRow>
                        </Grid>
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}