const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("DavidoConcert", function () {
  let DavidoConcert;
  let davidoconcert;
  let deployer;
  let address1;
  let currentTimeInSeconds = Math.floor(Date.now() / 1000);
  let amount = ethers.utils.parseEther("0.5");

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
    it("Buy Ticket as a guest on whitelist", async function () {
      assert.isBelow(
        parseInt((await davidoconcert.totalTicketSold()).toString()),
        parseInt((await davidoconcert.MAX_TICKET()).toString())
      );
      assert.isAtLeast((await davidoconcert.TICKETPRICE()).toString(), amount);
      assert.equal((await davidoconcert.ConcertState()).toString(), 0);
      await davidoconcert.connect(deployer).addWhitelist([address1.address]);
      assert.equal(await davidoconcert.whitelist(address1.address), true);
      assert.isBelow(
        parseInt((await davidoconcert.tickets.length).toString()),
        parseInt((await davidoconcert.PRE_SALE_TICKETS()).toString())
      );
      await davidoconcert.connect(address1).buyTicket({ value: amount });
      assert.equal((await davidoconcert.tickets(0)).length, 3);
      assert.equal(
        parseInt((await davidoconcert.totalTicketSold()).toString()),
        1
      );
      assert.isAtLeast(
        parseInt((await davidoconcert.totalAmount()).toString()),
        parseInt((await davidoconcert.TICKETPRICE()).toString())
      );
      assert.equal(await davidoconcert.guests(address1.address), true);
    });

    it("Buy Ticket as a guest that are not withlisted", async function () {
      await davidoconcert.startProperSales();
      assert.isBelow(
        parseInt((await davidoconcert.totalTicketSold()).toString()),
        parseInt((await davidoconcert.MAX_TICKET()).toString())
      );

      assert.isAtMost(
        parseInt(currentTimeInSeconds),
        parseInt((await davidoconcert.endTime()).toString())
      );

      assert.isAtLeast((await davidoconcert.TICKETPRICE()).toString(), amount);
      assert.equal((await davidoconcert.ConcertState()).toString(), 1);
      assert.isBelow(
        parseInt((await davidoconcert.tickets.length).toString()),
        parseInt((await davidoconcert.PRE_SALE_TICKETS()).toString())
      );
      await davidoconcert.connect(address1).buyTicket({ value: amount });
      assert.equal((await davidoconcert.tickets(0)).length, 3);
      assert.equal(
        parseInt((await davidoconcert.totalTicketSold()).toString()),
        1
      );
      assert.isAtLeast(
        parseInt((await davidoconcert.totalAmount()).toString()),
        parseInt((await davidoconcert.TICKETPRICE()).toString())
      );
      assert.equal(await davidoconcert.guests(address1.address), true);
    });
  });
  describe("add Whitelist", function () {
    it("add Whitelist", async function () {
      await davidoconcert.connect(deployer).addWhitelist([address1.address]);
      assert.equal(await davidoconcert.whitelist(address1.address), true);
    });
  });

  describe("remove Whitelist", function () {
    it("remove Whitelist", async function () {
      await davidoconcert.connect(deployer).addWhitelist([address1.address]);
      await davidoconcert
        .connect(deployer)
        .removeWhitedAddress(address1.address);
      assert.equal(await davidoconcert.whitelist(address1.address), false);
    });
  });

  describe("start ProperSales", function () {
    it("start ProperSales", async function () {
      await davidoconcert.connect(deployer).startProperSales();
      assert.isAbove(
        parseInt((await davidoconcert.endTime()).toString()),
        parseInt(currentTimeInSeconds)
      );
      assert.equal((await davidoconcert.ConcertState()).toString(), 1);
    });
  });

  describe("kill contract and transfer to the owner", function () {
    it("kill contract and transfer to the owner", async function () {
      await davidoconcert.connect(address1).buyTicket({ value: amount });
      await davidoconcert.connect(deployer).kill();
      const balance = await ethers.provider.getBalance(deployer.address);
      assert.isAtLeast(balance, amount);
    });
  });
});
