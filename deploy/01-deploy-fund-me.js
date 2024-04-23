const { network } = require("hardhat");
const { networkConfig } = require( "../helper-hardhat-config");
require('dotenv').config();
module.exports = async ({getNamedAccounts,deployments})=>{
    const {deploy,log} = deployments;
    const {deployer} = await getNamedAccounts();
    const chainId =  network.config.chainId;
    let ethUsdPriceFeedAddress;
    ethUsdPriceFeedAddress=networkConfig[chainId]['ethUsdPriceFeed'];
  
    const fundMe = await deploy("FundMe",{
        from:deployer,
        args:[ethUsdPriceFeedAddress],
        log:true
    })
    console.log(`FundMe deployed at ${fundMe.address}`);
    
 }
 module.exports.tags =["all","fundMe"]