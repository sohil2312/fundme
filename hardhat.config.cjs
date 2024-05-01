require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY = process.env.PRIVATE_KEY
const HARDHAT_KEY = process.env.HARDHAT_ACCOUNT_KEY
const HARDHAT_KEY_2 = process.env.HARDHAT_ACCOUNT_KEY_2

module.exports = {
  solidity: "0.8.24",
  defaultNetwork:"hardhat",
  networks:{
    hardhat: {
      chainId: 31337,
      accounts: [{ privateKey: HARDHAT_KEY, balance: "10000000000000000000000" },{ privateKey: HARDHAT_KEY_2, balance: "10000000000000000000000" }], // Format the account properly
    },
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
