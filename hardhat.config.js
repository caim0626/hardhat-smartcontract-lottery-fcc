require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-ethers")
// require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
// require("hardhat-contract-sizer")
require("dotenv").config()

const Goerli_RPC_URL = process.env.GOERLI_RPC_URL
const Goerli_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY
const LOCAL_RPC_URL = process.env.LOCAL_RPC_URL
const LOCAL_PRIVATE_KEY = process.env.LOCAL_PRIVATE_KEY
const LOCAL_PRIVATE_KEY2 = process.env.LOCAL_PRIVATE_KEY2
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

module.exports = {
    solidity: "0.8.7",
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            url: LOCAL_RPC_URL,
            accounts: [LOCAL_PRIVATE_KEY, LOCAL_PRIVATE_KEY2],
            chainId: 1337,
            // allowUnlimitedContractSize: true,
            gas: 2100000,
            // blockConfirmations: 6,
        },
        goerli: {
            url: Goerli_RPC_URL,
            accounts: [Goerli_PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
            gas: 2100000,
        },
        hardhat: {
            // allowUnlimitedContractSize: true,
            gas: 2100000,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    contractSizer: {
        runOnCompile: false,
        only: ["Raffle"],
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    etherscan: {
        apiKey: {
            goerli: "RMX9UVBJW4WIN6QRTSXV2V835JUS2WPD68",
        },
    },
    mocha: {
        timeout: 300000,
    },
}
