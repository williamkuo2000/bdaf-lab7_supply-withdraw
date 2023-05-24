
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/o_DjK8OQfaw00rx2zPccmzNZUmByfr9T",
        blockNumber: 17228670
      }
    }
  }
};