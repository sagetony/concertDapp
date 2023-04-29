async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  // Get the contract Factory
  const DavidoConcert = await ethers.getContractFactory("DavidoConcert");

  // Depoly the contract
  const davidoconcert = await DavidoConcert.deploy();
  console.log("Deloyed contract address:", davidoconcert.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
