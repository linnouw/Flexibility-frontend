import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  //supportedChainIds: [1, 3, 4, 5, 42, 43113, 43114],
  supportedChainIds: [1, 42, 1337],
});
