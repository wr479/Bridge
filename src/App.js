import { contractABI } from "./contractABI";
import ethers from "ethers";
// import * as fs from 'fs';

import './App.css';

function App() {
  // console.log(window)
  async function connectWallet() {
    if(window.ethereum== "undefiend") {
      console.log("Metamask isn't download");
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account)
    return await account;
  }
(async () => {
  // Deploy the contract to Ethereum test network - Ropsten
  const provider = ethers.providers.getDefaultProvider('ropsten')

  // Use your wallet's private key to deploy the contract
  const privateKey = '647afc51dcf29254821c640aac32165fd463f5060f58790601e64aae731cc3a7'
  const wallet = new ethers.Wallet(privateKey, provider)

  // Read the contract artifact, which was generated by Remix
  const metadata = contractABI
  // Set gas limit and gas price, using the default Ropsten provider
  const price = ethers.utils.formatUnits(await provider.getGasPrice(), 'gwei')
  const options = {gasLimit: 100000, gasPrice: ethers.utils.parseUnits(price, 'gwei')}

  // Deploy the contract
  const factory = new ethers.ContractFactory(metadata.abi, metadata.data.bytecode.object, wallet)
  const contract = await factory.deploy(options)
  await contract.deployed()
  console.log(`Deployment successful! Contract Address: ${contract.address}`)
})()

  return (
    <div className="App">
      <button onClick={connectWallet}>Подключиться к кошельку</button>
      
    </div>
  );
}

export default App;
