const { assert } = require('assert');
const { TASK_NODE_CREATE_SERVER } = require('hardhat/builtin-tasks/task-names');
const hre = require('hardhat');

const jsonRpcUrl = 'http://127.0.0.1:8545';
const cometAddress = '0xc3d688B66703497DAA19211EEdff47f25384cdc3'; // Compound USDC contract address
const usdcAddress = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC token contract address
const wethAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH token contract address
const aliceAddress = '0xDa9CE944a37d218c3302F6B82a094844C6ECEb17'; // Address to impersonate as Alice
const bobAddress = '0xF977814e90dA44bFA03b6295A0616a897441aceC'; // Address to impersonate as Bob

const cometAbi = [
  'function getCollateralReserves(address asset) public view returns (uint)',
  'function supply(address asset, uint amount) external returns (uint256)',
  'function withdraw(address asset, uint256 amount) external returns (uint256)',
];

const usdcAbi = [
  'function approve(address spender, uint256 value) external returns (bool)',
  'function balanceOf(address account) view returns (uint256)'
];

const wethAbi = [
  'function deposit() payable',
  'function balanceOf(address input) view returns (uint256)',
  'function approve(address, uint) returns (bool)',
];

let jsonRpcServer;

describe("Compound III Liquidity Experiment", function () {
  before(async () => {
    console.log('\nRunning a Hardhat local EVM fork of Ethereum Mainnet...\n');

    jsonRpcServer = await hre.run(TASK_NODE_CREATE_SERVER, {
      hostname: 'localhost',
      port: 8545,
      provider: hre.network.provider
    });

    await jsonRpcServer.listen();
  });

  after(async () => {
    await jsonRpcServer.close();
  });

  it('Fetches USDC balance from Compound - 1st time', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const comet = new ethers.Contract(cometAddress, cometAbi, provider);
    const balance = await comet.getCollateralReserves(usdcAddress);

    console.log(`\n- USDC Balance in Compound: ${ethers.utils.formatUnits(balance, 6)}`);
  });

  it('Alice provides liquidity to Compound', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const signer = await provider.getSigner(aliceAddress);
    const alice = await ethers.getImpersonatedSigner(aliceAddress);

    const comet = new ethers.Contract(cometAddress, cometAbi, alice);
    const usdc = new ethers.Contract(usdcAddress, usdcAbi, signer);

    const aliceUSDCBalance = ethers.utils.parseUnits('1000', 6);

    // Approve the transfer of USDC assets
    const approvalTx = await usdc.approve(cometAddress, aliceUSDCBalance);
    await approvalTx.wait();

    console.log("\t--> Transfer of Alice's' USDC assets approved.");

    // Provide liquidity to Compound
    const tx = await comet.supply(usdcAddress, aliceUSDCBalance);
    await tx.wait();

    console.log('\n- Alice provided 1000 USDC to Compound.');
  });

  it('Fetches USDC balance from Compound - 2nd time', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const comet = new ethers.Contract(cometAddress, cometAbi, provider);
    const balance = await comet.getCollateralReserves(usdcAddress);

    console.log(`\n- USDC Balance in Compound: ${ethers.utils.formatUnits(balance, 6)}`);
  });

  it('Bob withdraws all the USDC balance from Compound', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const signer = await provider.getSigner(bobAddress);
    const bob = await ethers.getImpersonatedSigner(bobAddress);

    const comet = new ethers.Contract(cometAddress, cometAbi, bob);
    const weth = new ethers.Contract(wethAddress, wethAbi, signer);

    // Bob first put some WETH into the Compond
    tx = await weth.approve(cometAddress, ethers.constants.MaxUint256);
    await tx.wait(1);

    console.log("\t--> Transfer of Bob's WETH assets approved.");

    const ethToDeposit = '100000';
    tx = await weth.deposit({ value: ethers.utils.parseEther(ethToDeposit) });
    await tx.wait(1);

    tx = await comet.supply(wethAddress, ethers.utils.parseEther(ethToDeposit));
    await tx.wait(1);

    console.log('\t--> Bob provided some WETH to Compound.');
    

    // Withdraw all the USDC balance
    const balance = await comet.getCollateralReserves(usdcAddress);
    const withdrawTx = await comet.withdraw(usdcAddress, balance);
    await withdrawTx.wait(1);

    console.log('\n- Bob withdraw all the USDC balance from Compound.');
  });

  it('Fetches USDC balance from Compound - 4th time', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const comet = new ethers.Contract(cometAddress, cometAbi, provider);
    const balance = await comet.getCollateralReserves(usdcAddress);

    console.log(`\n- USDC Balance in Compound: ${ethers.utils.formatUnits(balance, 6)}`);
  });

  it('Alice tries to withdraw 1000 USDC from the Compound', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const signer = await provider.getSigner(aliceAddress);
    const alice = await ethers.getImpersonatedSigner(aliceAddress, signer);

    const comet = new ethers.Contract(cometAddress, cometAbi, alice);
    const usdc = new ethers.Contract(usdcAddress, usdcAbi, signer);

    const aliceUSDCWithdrawl = ethers.utils.parseUnits('1000', 6);

    // Provide liquidity to Compound
    const tx = await comet.withdraw(usdcAddress, aliceUSDCWithdrawl);
    await tx.wait();

    console.log('\n- Alice withdraw 1000 USDC from Compound.');
  });

  it('Fetches USDC balance from Compound - 5th time', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const comet = new ethers.Contract(cometAddress, cometAbi, provider);
    const balance = await comet.getCollateralReserves(usdcAddress);

    console.log(`\n- USDC Balance in Compound: ${ethers.utils.formatUnits(balance, 6)}`);
  });
});
