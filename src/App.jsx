import { useState } from 'react'
import './App.css'
import { ethers } from 'ethers';
import ABI from "./contractsData/Abi.json";
import Contract from "./contractsData/contract-address.json";

import Navigation from './components/NavBar';
import Home from './components/Home';



function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState();


  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })

    loadContracts(signer);


  }

  const loadContracts = async (signer) => {

    const contract = new ethers.Contract(Contract.address, ABI, signer)
    console.log('contract', contract);
    setContract(contract);

  }
  return (
    <>

      <div >

        <Navigation web3Handler={web3Handler} account={account} />
        <Home contract={contract} account={account} />
      </div>


    </>
  )
}

export default App
