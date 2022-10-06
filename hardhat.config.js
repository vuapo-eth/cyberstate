require("@nomicfoundation/hardhat-toolbox");
require('custom-env').env()

const CONTRACT_ADDRESS = "0x55e39a7f9Ab12CCADe517076dbcDD547c582AB61";

task("deploy", "Deploys the contract", async (taskArgs, hre) => {
    const Citizens = await hre.ethers.getContractFactory("Citizens");
    const citizens = await Citizens.deploy();
    await citizens.deployed();
    console.log("Citizens.sol deployed to: " + citizens.address);
});

task("register_citizen", "Registers a citizen")
    .addParam("address", "The EVM address of the new citizen")
    .setAction(async (taskArgs, hre) => {
        const Citizens = await hre.ethers.getContractFactory("Citizens");
        const citizens = await Citizens.attach(CONTRACT_ADDRESS);
        await citizens.register_citizen(taskArgs.address);
        let id = await citizens.id_by_address(taskArgs.address);
        console.log("Citizen #"+id+" ('" + taskArgs.address + "') added");
    });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.17",
    defaultNetwork: "shimmer_testnet",
    networks: {
        shimmer_testnet: {
            url: "https://api.sc.testnet.shimmer.network/chain/rms1prr4r7az8e46qhagz5atugjm6x0xrg27d84677e3lurg0s6s76jr59dw4ls/evm/jsonrpc",
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};