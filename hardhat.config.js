require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
  solidity: "0.8.24",
  defaultNetwork:"hardhat",
  networks:{
    sepolia: {
      url: 'https://sepolia.infura.io/v3/71de0f917322495b83a52877e51aa998',
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6,
  },
  arbitrum_sepolia:{
      url: 'https://arbitrum-sepolia.infura.io/v3/71de0f917322495b83a52877e51aa998',
      accounts: [PRIVATE_KEY],
      chainId: 421614,
      blockConfirmations: 6,
  }
  },
  namedAccounts:{
    deployer:{
      default:0,
    },
    users:{
      default:1,
    },
    
  }
};
