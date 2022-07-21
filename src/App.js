import React from "react";
// @MUI
import { Grid } from "@mui/material";
// components
import Sidebar from "./components/Sidebar/Sidebar";
// style
import "./App.css";
//useContext
import Web3Context from "./Web3Context";

export default function App() {
  const projectUrl = "http://localhost:7545";
  const [productsAddresses, setProductsAddresses] = React.useState();

  React.useEffect(() => {
    load();
  }, [productsAddresses]);

  /**fetch products addresses with web3*/
  async function load() {
    const web3 = new Web3(new Web3.providers.HttpProvider(projectUrl));
    const networkId = await web3.eth.net.getId();

    const FlexibilityList = new web3.eth.Contract(
      FlexibilityList_contract.abi,
      FlexibilityList_contract.networks[networkId].address
    );
    //get products
    const products_addresses =
      await FlexibilityList.methods.getAllProducts.call();
    setProductsAddresses(products_addresses);
  }

  return (
    <Grid className="minHeight">
      <Web3Context.Provider value={{ projectUrl, productsAddresses }}>
        <Sidebar />
      </Web3Context.Provider>
    </Grid>
  );
}
