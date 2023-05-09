async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  // Get the contract Factory
  const DavidoConcert = await ethers.getContractFactory("DavidoConcert");

  // Depoly the contract
  const davidoconcert = await DavidoConcert.deploy();
  console.log("Deloyed contract address:", davidoconcert.address);

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(davidoconcert, "DavidoConcert");
}

function saveFrontendFiles(contract, name) {
  const path = require("path");
  const fs = require("fs");
  const newPath = path.join(__dirname, "../");

  const contractsDir = newPath + "frontend/src/abis/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
