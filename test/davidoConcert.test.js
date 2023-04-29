const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("DavidoConcert", function () {
  let DavidoConcert;
  let davidoconcert;
  let deployer;
  let address1;

  beforeEach(async function () {
    // Get the ContractFactory and Signer here.
    [deployer, address1] = await ethers.getSigners();
    DavidoConcert = await ethers.getContractFactory("DavidoConcert");

    // deploy contract
    davidoconcert = await DavidoConcert.deploy();
  });

  describe("Constructor from DavidoConcert Contract", function () {
    it("Should have a owner", async function () {
      expect(await davidoconcert.owner()).to.be.equal(deployer.address);
    });
    it("Should have a Concert State of Presale", async function () {
      assert.equal((await davidoconcert.ConcertState()).toString(), 0);
    });
  });
  describe("buy ticket Function", function () {
    let amount = ethers.utils.parseEther("0.5");
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    it("Buy Ticket", async function () {
      assert.isAtMost(
        parseInt((await davidoconcert.totalTicketSold()).toString()),
        parseInt((await davidoconcert.MAX_TICKET()).toString())
      );

      assert.isAtLeast((await davidoconcert.TICKETPRICE()).toString(), amount);
      if (assert.equal((await davidoconcert.ConcertState()).toString(), 0)) {
        await davidoconcert.connect(deployer).addWhitelist([address1.address]);
        assert.equal(
          (await davidoconcert.whitelist(address1.address)).toString(),
          true
        );
      }
      // assert.isAtMost(
      //   (currentTimeInSeconds,
      //   parseInt(await davidoconcert.endTime()).toString())
      // );
    });
  });
});
