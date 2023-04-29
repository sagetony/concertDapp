// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0 ;

contract DavidoConcert {
    // Tickets can be bought till 1000 or after 10 days from the “startTime”.
    // The first 200 have a pre-sale allowed under whitelist.
    // The first 20 will receive a soulbound token minted directly from the contract.
    // Price is same for all, set a default price. Payment in Eth for minting of tickets.
    // The contract should be killed and the funds raised returned to owner when done.

    address public owner;
    uint public constant MAX_TICKET= 1000;
    uint256 public constant PRE_SALE_TICKETS = 200;
    uint256 public constant SOULBOUND_TOKENS = 20;
    uint public constant TICKETPRICE = 0.5 ether;
    uint public startTime;
    enum State {PRESALE, STARTED , PAUSED, ENDED}
    State public ConcertState;
    mapping (address => bool) whitelist;
    uint internal whitelisted;
    uint public totalTicketSold;
    uint public totalAmount;

    struct Ticket {
        uint id;
        address guest;
        bool sold;
    }
    Ticket[] public tickets;

    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    constructor(){
        owner = msg.sender;
        ConcertState = State.PRESALE;
    }

    function buyTicket() public payable { 
        if(ConcertState == State.PRESALE){
            require(whitelist[msg.sender] = true, "You are not Whitelisted");
            require(tickets.length <=  PRE_SALE_TICKETS, "First 200 exceeded");
            require(msg.value >= TICKETPRICE, "Ticket Price is 0.5 ether");
            
            uint remainingAmount =  msg.value - TICKETPRICE;
            Ticket memory ticket = Ticket(tickets.length, msg.sender, true);
            tickets.push(ticket);
            payable(msg.sender).transfer(remainingAmount);
        }
    }
    function addWhitelist (address [] calldata _guests) public onlyOwner {
        for(uint i = 0; i < _guests.length; i++){
            whitelist[_guests[i]] = true;
        }
    }

    function removeWhitedAddress (address _guest) public onlyOwner{
        whitelist[_guest] = false;
    }

    function startProperSales() public onlyOwner {
        startTime = block.timestamp;
        ConcertState = State.STARTED;
    } 

}