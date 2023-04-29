// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Soulbound is ERC721{

    uint8 public constant SUPPLY = 20;
    address public owner;
    uint8 public nftCount;

    constructor () ERC721 ("SOULBOUNDTOKEN", "SBT"){
        owner = msg.sender;
    }
    modifier onlyOwner () {
        require(msg.sender == owner, "Only owner has permission");
        _;
    }
    function mintToken(address _to) external onlyOwner returns (uint256){
        require (nftCount < SUPPLY, "Maximum supply reached");
        ++nftCount;
        uint256 tokenId = nftCount;
        _mint(_to, tokenId);
        return tokenId;
    }
}