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



  return (
    <div className="App">
      <button onClick={connectWallet}>Подключиться к кошельку</button>
      
    </div>
  );
}

export default App;
