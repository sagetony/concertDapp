//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Soulbound is ERC721{

    uint8 public constant SOULBOUND_SUPPLY = 20;

    address public owner;
    uint8 public soulboundCount;

    constructor () ERC721 ("SOULBOUNDTOKEN", "SBT"){
        owner = msg.sender;
    }
    modifier onlyOwner () {
        require(msg.sender == owner, "Only owner has permission");
        _;
    }
    function mintToken(address _to) external onlyOwner returns (uint256){
        require (soulboundCount < SOULBOUND_SUPPLY, "Maximum supply reached");
        ++soulboundCount;
        uint256 tokenId = soulboundCount;
        _mint(_to, tokenId);
        return tokenId;
    }

    function _approve(address to, uint256 tokenId) internal override(ERC721) {}
    function _burn(uint256 tokenId) internal override(ERC721) {}    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721) {}
}