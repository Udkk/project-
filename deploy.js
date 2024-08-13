const hre = require("hardhat");

async function main() {
  const initBalance = 1;
  const Contract = await hre.ethers.getContractFactory("Assessment");
  const contract = await Contract.deploy(initBalance);
  await contract.deployed();

  console.log(`A contract is deployed to ${contract.address}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
