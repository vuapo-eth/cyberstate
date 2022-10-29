require("@nomicfoundation/hardhat-toolbox");
require('custom-env').env()

const CITIZENS_ADDRESS = "0x33F3dd1170F22d51e111B0CFbE73a203f9eA1D13";
const CYBERCOINS_ADDRESS = "0x1c6e4922A74a6785Bbb9eaeED5110adeb9C9e634";

task("deploy", "Deploys the contract", async (taskArgs, hre) => {
    const Citizens = await hre.ethers.getContractFactory("Citizens");
    const citizens = await Citizens.deploy();
    await citizens.deployed();
    console.log("Citizens.sol deployed to: " + citizens.address);

    const CyberCoins = await hre.ethers.getContractFactory("CyberCoins");
    const cyber_coins = await CyberCoins.deploy(citizens.address);
    await cyber_coins.deployed();
    console.log("CyberCoins.sol deployed to: " + cyber_coins.address);
});

task("register_citizen", "Registers a citizen")
    .addParam("address", "The EVM address of the new citizen")
    .setAction(async (taskArgs, hre) => {
        const Citizens = await hre.ethers.getContractFactory("Citizens");
        const citizens = await Citizens.attach(CITIZENS_ADDRESS);
        await citizens.register_citizen(taskArgs.address);
        let id = await citizens.id_by_address(taskArgs.address);
        console.log("Citizen #" + id + " ('" + taskArgs.address + "') added");

        const CyberCoins = await hre.ethers.getContractFactory("CyberCoins");
        const cyber_coins = await CyberCoins.attach(CYBERCOINS_ADDRESS);
        await cyber_coins.register_citizen(taskArgs.address);
        console.log("Citizen registered for CyberCoin UBI");
    });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "harmony",
    networks: {
        shimmer_testnet: {
            url: "https://api.sc.testnet.shimmer.network/chain/rms1pzw5y4e4y6gzkytvjp0ukgjgs37vd33uvnju9tuf6rrztnnw4tj7crw72ar/evm/jsonrpc",
            accounts: [process.env.PRIVATE_KEY]
        },
        harmony: {
            url: "https://rpc.ankr.com/harmony",
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};