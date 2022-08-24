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
    AOAddr: PropTypes.array,
  };

export default function AO(AOAddr) {
    const context = React.useContext( Web3Context);
    const { projectUrl } = context;
    const [haveMetamask, sethaveMetamask] = React.useState(true);
    const [accountAddress, setAccountAddress] = React.useState('');
    const [isConnected, setIsConnected] = React.useState(false);    
    const [ tokenOpen , setTokenOpen ] = React.useState();

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
            if (aROwner.toUpperCase() === accountAddress.toUpperCase()){
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
            else{
                alert("Only owner of Activation request can mint token")
            }
        
    }

    return(
        <Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Activation Request Owner</TableCell>
                            <TableCell align="right">Bid Owner</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {AOAddr["AOAddr"].map((ao, index) => 
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                <a href={`https://app.tryethernal.com/address/${ao[0]}`} target="_blank" rel="noreferrer">{ao[0]}</a>
                                </TableCell>
                                <TableCell align="right"><a href={`https://app.tryethernal.com/address/${ao[1]}`} target="_blank" rel="noreferrer">{ao[1]}</a></TableCell>
                                <TableCell align="right">{ao[2]}</TableCell>
                                <TableCell>
                                    { isConnected ?
                                         (<Button variant="contained" style={{fontSize : '10px'}} color="success" onClick={() => mint( ao[0] , ao[1] , ao[2] )}>Mint token</Button>):
                                        (<Button variant="contained" style={{fontSize : '10px'}} color="success" onClick={connectWallet}>Connect to wallet</Button>)
                                    }
                                </TableCell>
                            </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}