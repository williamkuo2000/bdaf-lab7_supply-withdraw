# 0816006-bdaf-lab7
Testing the behavior of Compound III's supply and withdraw


## Environment setup
For details, follow the steps on https://docs.alchemy.com/docs/hello-world-smart-contract .

First, initialize your project in your project folder.
```
npm init
```
Answer a few question for the package.json file.

Second, download hardhat and create a hardhat project.
```
npm install --save-dev hardhat
npx hardhat
```
```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.12.2 👷‍

? What do you want to do? … 
  Create a JavaScript project
  Create a TypeScript project
❯  Create an empty hardhat.config.js
  Quit
```

Add project folders.
```
mkdir teset
```
```
test
  └───supply-withdraw.js
```

## Writing the test script

Write the script according to these steps:
- [Print] the USDC balance in the Compound USDC contract
- Alice provides liquidity (1000 USDC) into the Compound USDC contract
- [Print] the USDC balance in the Compound USDC contract
- Bob performs some setup … (think about it and try to figure out yourself!)
- Bob withdraws all the USDC balance
- [Print] the USDC balance in the Compound USDC contract, this should be 0, or a very small number close to 0
- [Print] Alice tries to withdraw 1000 USDC, record what happened and print those out


## Test result
Run command
```
npx hardhat test
```
Test result:
```
Compound III Liquidity Experiment

Running a Hardhat local EVM fork of Ethereum Mainnet...


- USDC Balance in Compound: 46963238.052894
    ✔ Fetches USDC balance from Compound - 1st time (2113ms)
        --> Transfer of Alice's' USDC assets approved.

- Alice provided 1000 USDC to Compound.
    ✔ Alice provides liquidity to Compound (223ms)

- USDC Balance in Compound: 46964238.052894
    ✔ Fetches USDC balance from Compound - 2nd time
        --> Transfer of Bob's WETH assets approved.
        --> Bob provided some WETH to Compound.

- Bob withdraw all the USDC balance from Compound.
    ✔ Bob withdraws all the USDC balance from Compound (397ms)

- USDC Balance in Compound: 0.0
    ✔ Fetches USDC balance from Compound - 4th time
    1) Alice tries to withdraw 1000 USDC from the Compound

- USDC Balance in Compound: 0.0
    ✔ Fetches USDC balance from Compound - 5th time


  6 passing (3s)
  1 failing

  1) Compound III Liquidity Experiment
       Alice tries to withdraw 1000 USDC from the Compound:
     Error: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="VM Exception while processing transaction: reverted with reason string 'ERC20: transfer amount exceeds balance'", method="estimateGas", transaction={"from":"0xDa9CE944a37d218c3302F6B82a094844C6ECEb17","to":"0xc3d688B66703497DAA19211EEdff47f25384cdc3","data":"0xf3fef3a3000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000003b9aca00","accessList":null}, error={"stackTrace":[{"type":2,"address":{"type":"Buffer","data":[195,214,136,182,103,3,73,125,170,25,33,30,237,255,71,242,83,132,205,195]}},{"type":2,"address":{"type":"Buffer","data":[195,214,136,182,103,3,73,125,170,25,33,30,237,255,71,242,83,132,205,195]}},{"type":2,"address":{"type":"Buffer","data":[160,184,105,145,198,33,139,54,193,209,157,74,46,158,176,206,54,6,235,72]}},{"type":18,"address":{"type":"Buffer","data":[160,184,105,145,198,33,139,54,193,209,157,74,46,158,176,206,54,6,235,72]},"message":{"value":{"type":"Buffer","data":[8,195,121,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38,69,82,67,50,48,58,32,116,114,97,110,115,102,101,114,32,97,109,111,117,110,116,32,101,120,99,101,101,100,115,32,98,97,108,97,110,99,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},"_selector":"08c379a0"},"isInvalidOpcodeError":false}],"data":"0x08c379a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002645524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e63650000000000000000000000000000000000000000000000000000"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.2)
      at Logger.makeError (node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
      at Logger.throwError (node_modules/@ethersproject/logger/src.ts/index.ts:281:20)
      at checkError (node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:78:20)
      at EthersProviderWrapper.<anonymous> (node_modules/@ethersproject/providers/src.ts/json-rpc-provider.ts:642:20)
      at step (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:48:23)
      at Object.throw (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:29:53)
      at rejected (node_modules/@ethersproject/providers/lib/json-rpc-provider.js:21:65)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at runNextTicks (node:internal/process/task_queues:64:3)
      at listOnTimeout (node:internal/timers:538:9)
```
