"use client";
import React, { useEffect, useState } from "react";
import FundMeContract from "../../../artifacts/contracts/FundMe.sol/FundMe.json";
import { ethers } from "ethers";
import LoadingAnimation from "../animation/LoadingAnimation";

const BodyOfFundMe = () => {
  const [fundMeLoading, setFundMeLoading] = useState(false)
  const [balance, setBalance] = useState(null);
  const [contractCopy, setcontractCopy] = useState(null);
  const [provider, setProvider] = useState(null);
  const CONTRACT_ADDRESS = "0x71C95911E9a5D330f4D621842EC243EE1343292e";
  const [connected, setConnected] = useState(false);
  const [input, setInput] = useState('0');
  
  const getSignerAccount= async () =>{
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const newProvider = await new ethers.BrowserProvider(window.ethereum);
  
    setProvider(newProvider);
    const signer = await newProvider.getSigner();
    return signer
}
  const getBalance = async () => {
    if (window.ethereum) {
      try {
        const signer = await getSignerAccount();
        setConnected(true);
        const newProvider = await new ethers.BrowserProvider(window.ethereum);
    
        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          FundMeContract.abi,
          signer
        );
        setcontractCopy(contractInstance);
        const balanceOfSmartContract = await newProvider.getBalance(
          CONTRACT_ADDRESS
        );
        setBalance(Number(ethers.formatEther(balanceOfSmartContract)));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getBalance();
  }, []);


  const connectAccount = async () => {
    if (window.ethereum) {
      try {
        await getSignerAccount();
        setConnected(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleFundMeClick = async () => {
    if (window.ethereum) {
      const signer = await getSignerAccount();
      try {
        setFundMeLoading(true)
        console.log(fundMeLoading)
        const response = await contractCopy.connect(signer).fund({
          value: ethers.parseEther(input),
        });
  
        const balanceOfSmartContract = await provider.getBalance(
          CONTRACT_ADDRESS
        );
        setInput('0')
        setBalance(Number(ethers.formatEther(balanceOfSmartContract)));
        
      } catch (error) {
        console.log(error);
      }finally{
        setFundMeLoading(false)
        console.log(fundMeLoading)
      }
    }
  };
  const handleOnChange = async (e) => {
    setInput(e.target.value.toString());
  };
  const handleWithdrawbtn = async () => {
    try {
      const signer = await getSignerAccount()
      const response = await contractCopy.connect(signer).withdraw();
      getBalance();
      setInput('0')
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="bodyFundMe">
      <div className="balanceTab">
        <p>Balance: {balance} ETH</p>
      </div>
      <div className="btnclb">
        <input
          type="number"
          className="inpEth"
          value={input}
          onChange={handleOnChange}
        ></input>
        <button className="fundMebtn" onClick={handleFundMeClick}>
          {fundMeLoading?(<LoadingAnimation/>):('Fund Me')}
        </button>
        <button className="Connect" onClick={connectAccount}>
          {connected ? (
            <span>
              Connected<span className="dot green"></span>
            </span>
          ) : (
            <span>
              Connect<span className="dot red"></span>
            </span>
          )}
        </button>
        <button className="withdrawbtn" onClick={handleWithdrawbtn}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default BodyOfFundMe;
