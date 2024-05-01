import { assert,expect } from "chai";
import pkg from 'hardhat';
const { deployments, ethers,getNamedAccounts,waffle } = pkg

describe("FundMe",async () => {
   let FundMe;
   let MockV3Aggregator;
   let deployer;
   let users;
   let sendValue = ethers.parseEther('1')
   beforeEach(async () => {
      const { deployer: deployerAccount } = await getNamedAccounts();
      const { users: userAccount } = await getNamedAccounts();
      deployer = deployerAccount;
      users=userAccount;
      await deployments.fixture(['all'])

      const FundMeInstance = await deployments.get("FundMe")
      const MockV3AggregatorInstance = await deployments.get("MockV3Aggregator")
      FundMe = await ethers.getContractAt(FundMeInstance.abi,FundMeInstance.address)
      MockV3Aggregator= await ethers.getContractAt(MockV3AggregatorInstance.abi,MockV3AggregatorInstance.address)
      // fundMe = await ethers.getContractAt('FundMe',deployer)
     
      // MockV3Aggregator = await ethers.getContractAt("MockV3Aggregator",deployer)
     
   });
   describe("constructor",()=>{
      it("checks Aggregator Address",async ()=>{
         const response = await FundMe.getPriceFeed();
         assert.equal(response,MockV3Aggregator.target)
         console.log(users)
       
     })
   })
   describe("fund",()=>{
      it("checks balance difference with amount sent",async ()=>{
         const startingBalance = await FundMe.getAddressToAmountFunded(deployer)
         await FundMe.fund({from:deployer,value:sendValue})
         const finalBalance = await FundMe.getAddressToAmountFunded(deployer)
         assert.equal(sendValue.toString(),finalBalance.toString())     
      })
      it("Get Added to funders Array",async ()=>{
        await FundMe.fund({value:sendValue})
        const response = await FundMe.getFundersArray()
        assert.equal(deployer,response[0])
      })
      
   })
   describe("withdraw",()=>{
      beforeEach(async ()=>{
         const fundMeResponse = await FundMe.fund({value:sendValue})
         const fundMeReceipt = await fundMeResponse.wait()
         const deployerBalance = await ethers.provider.getBalance(deployer)
         const {gasUsed,gasPrice} = fundMeReceipt
         console.log(ethers.formatEther(gasPrice*gasUsed))
         console.log(ethers.formatEther(deployerBalance))
      })
      it("Withdraws ether from contract",async ()=>{
         const startingFundMebalance = await ethers.provider.getBalance(FundMe.target)
         const startingDeployerbalance = await ethers.provider.getBalance(deployer)
         const transactionResponse = await FundMe.withdraw()
         const transactionReceipt = await transactionResponse.wait()
         const finalDeployerbalance = await ethers.provider.getBalance(deployer)
         const {cumulativeGasUsed,gasPrice} = transactionReceipt
         const gasUsed = (cumulativeGasUsed*gasPrice)
         console.log(transactionReceipt)
         console.log(ethers.formatEther(gasUsed))
         console.log(ethers.formatEther(startingDeployerbalance ))
      })
   })
    
   // describe("constructor",()=>{
   //    it("checks aggregator address",async ()=>{
   //       const response = await fundMe.getPriceFeed();
   //       console.log(response)
   //    })
   // })
  
});
