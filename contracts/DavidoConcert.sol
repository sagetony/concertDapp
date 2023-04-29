// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Soulbound.sol";

contract DavidoConcert is ERC721, Soulbound {
    // Tickets can be bought till 1000 or after 10 days from the “startTime”.
    // The first 200 have a pre-sale allowed under whitelist.
    // The first 20 will receive a soulbound token minted directly from the contract.
    // Price is same for all, set a default price. Payment in Eth for minting of tickets.
    // The contract should be killed and the funds raised returned to owner when done.

    Soulbound _s;

    uint16 public constant MAX_TICKET = 1000;
    uint8 public constant PRE_SALE_TICKETS = 200;
    uint8 public constant SOULBOUND_TOKENS = 20;
    uint64 public constant TICKETPRICE = 0.5 ether;

    uint256 public startTime;
    uint256 public endTime;

    uint8 internal whitelisted;
    uint16 public totalTicketSold;
    uint72 public totalAmount;
    
    enum State {PRESALE, STARTED}
    mapping (address => bool) public whitelist;
    mapping (address => bool) public guests;
    State public ConcertState;

    struct Ticket {
        uint id;
        address guest;
        bool sold;
    }
    Ticket[] public tickets;

    constructor(){
        _s = new Soulbound();
    }

    function buyTicket() external payable { 
        require(totalTicketSold <  MAX_TICKET, "Ticket has finished");
        require(msg.value >= TICKETPRICE, "Ticket Price is 0.5 ether");
        require(guests[msg.sender] != true, "You are already a guest");

        uint256 remainingAmount =  msg.value - TICKETPRICE;

        if(ConcertState == State.PRESALE){
            require(whitelist[msg.sender] = true, "You are not Whitelisted");
            require(tickets.length <  PRE_SALE_TICKETS, "First 200 exceeded");
            Ticket memory ticket = Ticket(tickets.length, msg.sender, true);
            tickets.push(ticket);
            payable(msg.sender).transfer(remainingAmount);
            _mint(msg.sender, tickets.length);
            totalTicketSold++;
            totalAmount += TICKETPRICE;
            guests[msg.sender] = true;

            if(tickets.length < SOULBOUND_TOKENS){
               _s.mintToken(msg.sender);
            }
            
        }else{
            require(block.timestamp < endTime, "Ticket sales is over");
            Ticket memory ticket = Ticket(tickets.length, msg.sender, true);
            tickets.push(ticket);
            payable(msg.sender).transfer(remainingAmount);
            _mint(msg.sender, tickets.length);
            totalTicketSold++;
            totalAmount += TICKETPRICE;
            guests[msg.sender] = true;

        }
    }
    function addWhitelist (address [] calldata _guests) external onlyOwner {
        uint256 length =  _guests.length;
        require(length < PRE_SALE_TICKETS, "Tickets can be more than 200");

        for(uint i = 0; i < length; i++){
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