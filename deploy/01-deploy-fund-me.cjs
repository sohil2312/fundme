const {network} = require('hardhat');
const {networkConfig,developmentChains} = require('../helper-hardhat-config.cjs')



require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    console.log(`deployer ${deployer}`)

    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
       
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
       
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const FundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${FundMe.address}`)

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.ETHERSCAN_API_KEY
    // ) {
    //     await verify(fundMe.address, [ethUsdPriceFeedAddress])
    // }
}

module.exports.tags = ["all", "FundMe"]