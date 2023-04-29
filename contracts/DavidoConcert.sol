// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0 ;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Soulbound.sol";

contract DavidoConcert is ERC721, Soulbound {
    // Tickets can be bought till 1000 or after 10 days from the “startTime”.
    // The first 200 have a pre-sale allowed under whitelist.
    // The first 20 will receive a soulbound token minted directly from the contract.
    // Price is same for all, set a default price. Payment in Eth for minting of tickets.
    // The contract should be killed and the funds raised returned to owner when done.

    Soulbound _s;
    uint public constant MAX_TICKET = 1000;
    uint public constant PRE_SALE_TICKETS = 200;
    uint public constant SOULBOUND_TOKENS = 20;
    uint public constant TICKETPRICE = 0.5 ether;
    uint public startTime;
    uint public endTime;
    uint internal whitelisted;
    uint public totalTicketSold;
    uint public totalAmount;
    enum State {PRESALE, STARTED}
    mapping (address => bool) public whitelist;
    State public ConcertState;

    struct Ticket {
        uint id;
        address guest;
        bool sold;
    }
    Ticket[] public tickets;

    constructor(){
        ConcertState = State.PRESALE;
        _s = new Soulbound();
    }

    function buyTicket() external payable { 
        require(totalTicketSold <=  MAX_TICKET, "Ticket has finished");
        require(msg.value >= TICKETPRICE, "Ticket Price is 0.5 ether");

        if(ConcertState == State.PRESALE){
            require(whitelist[msg.sender] = true, "You are not Whitelisted");
            require(tickets.length <=  PRE_SALE_TICKETS, "First 200 exceeded");
            uint remainingAmount =  msg.value - TICKETPRICE;
            Ticket memory ticket = Ticket(tickets.length, msg.sender, true);
            tickets.push(ticket);
            payable(msg.sender).transfer(remainingAmount);
            _safeMint(msg.sender, tickets.length);
            totalTicketSold++;
            totalAmount += TICKETPRICE;

            if(tickets.length <= SOULBOUND_TOKENS){
               _s.mintToken(msg.sender);
            }
            
        }else{
            require(block.timestamp <= endTime, "Ticket sales is over");
            uint remainingAmount =  msg.value - TICKETPRICE;
            Ticket memory ticket = Ticket(tickets.length, msg.sender, true);
            tickets.push(ticket);
            payable(msg.sender).transfer(remainingAmount);
            _safeMint(msg.sender, tickets.length);
            totalTicketSold++;
            totalAmount += TICKETPRICE;
        }
    }
    function addWhitelist (address [] calldata _guests) external onlyOwner {
        for(uint i = 0; i < _guests.length; i++){
            whitelist[_guests[i]] = true;
        }
    }

    function removeWhitedAddress (address _guest) external onlyOwner{
        whitelist[_guest] = false;
    }

    function startProperSales() external onlyOwner {
        startTime = block.timestamp;
        endTime = block.timestamp + 10 days;
        ConcertState = State.STARTED;
    } 

    function kill() external onlyOwner {
        require(totalTicketSold ==  MAX_TICKET || block.timestamp > endTime, "Tickets Sales Has not finished");
        selfdestruct(payable(owner));
    }

    receive() external payable {}

    fallback() external payable {}
}