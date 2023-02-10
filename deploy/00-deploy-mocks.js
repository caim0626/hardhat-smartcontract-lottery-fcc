const { network, ethers } = require("hardhat")
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config.js")

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 LINK per request
const GAS_PRICE_LINK = 1000000000
//calculated value based on the gas price of the chain.

// Eth price
// Chainlink Nodes pay the gas fees to give usrandomess & do external execution
// So they price of requests change based on the price of gas
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        // deploy a mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: network.config.blockConfirmations || 1,
        })
        log("Mocks Deployed!")
        log("---------------------")
    }
}

// module.exports.tags = ["all", "mocks"]
module.exports.tags = ["all", "mocks"]
