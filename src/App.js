import React from "react";
// @MUI
import { Grid } from "@mui/material";
// components
import Sidebar from "./components/Sidebar/Sidebar";
// style
import "./App.css";
//useContext
import Web3Context from "./Web3Context";
//web3
import Web3 from "web3/dist/web3.min.js";
import FlexibilityList_contract from "./abi/FlexibilityList.json";

export default function App() {
  const projectUrl = "http://localhost:8545";
  const [productsAddresses, setProductsAddresses] = React.useState();
  const [cftAddresses, setCFTAddresses] = React.useState([]);
  const [upcoming, setUpcoming] = React.useState();

  /**fetch products addresses with web3*/
  React.useEffect(() => {
      load();
      console.log(cftAddresses);
  }, [cftAddresses.length]);

  const load = async() => {
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();

    const accounts = await web3.eth.getAccounts();

    const FlexibilityList = new web3.eth.Contract(
      FlexibilityList_contract.abi,
      FlexibilityList_contract.networks[networkId].address
    );
    //get products
    const products_addresses = await FlexibilityList.methods
      .getAllProducts()
      .call();
    //get cfts
    const cft_addresses = await FlexibilityList.methods.getAllCFTs().call();
      
    setProductsAddresses(products_addresses);
    setCFTAddresses(cft_addresses);

  }

  return (
    <Grid className="minHeight">
      <Web3Context.Provider
        value={{ projectUrl, productsAddresses, cftAddresses , setCFTAddresses }}
      >
        <Sidebar />
      </Web3Context.Provider>
    </Grid>
  );
}
