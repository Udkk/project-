import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ContractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const ContractABI =[
	{
		"inputs": [],
		"name": "readdata",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_x",
				"type": "uint256"
			}
		],
		"name": "setdata",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atmContract, setATMContract] = useState(undefined);
  const [x, setX] = useState(undefined);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }
  }, []);

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(ContractAddress, ContractABI, signer);
    setATMContract(atmContract);
  }

  const setdata = async () => {
    if (atmContract) {
      try {
        const uint256Value = ethers.utils.parseUnits(inputValue, 0); // convert to uint256
        const tx = await atmContract.setdata(uint256Value);
        await tx.wait();
        readdata();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const readdata = async () => {
    if (atmContract) {
      try {
        const xValue = await atmContract.readdata();
        setX(xValue.toNumber());
      } catch (error) {
        console.error("Error reading data:", error);
      }
    }
  };
  

  

  

  useEffect(() => {
    readdata();
  }, [atmContract]);

  return (
    <div>
      <h1>Simple ATM Interface</h1>
      {ethWallet? (
        account? (
          <div>
            <p>Account: {account}</p>
            <p>X Value: {x}</p>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={setdata}>Set X</button>
            <button onClick={readdata}>read X</button>
            
          </div>
        ) : (
          <button onClick={connectAccount}>Please connect your MetaMask wallet</button>
        )
      ) : (
        <p>Please install MetaMask to use this ATM.</p>
      )}
    </div>
  );
}