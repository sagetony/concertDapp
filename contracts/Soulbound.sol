// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.18;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Soulbound is IERC721{

    uint8 public constant SUPPLY = 20;
    address public owner;
    uint8 public nftCount;

    string public override name = "SOULBOUNDTOKEN";
    string public override symbol = "SBT";
    uint256 public override totalSupply;
    mapping(address => uint256) public override balanceOf;
    mapping(uint256 => address) public override ownerOf;
    mapping(address => mapping(address => bool)) public override isApprovedForAll;
    mapping(uint256 => mapping(address => bool)) public override isApproved;


    constructor () {
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
        mint(_to, tokenId);
        return tokenId;
    }
       function mint(address _to, uint256 _tokenId) public  virtual  {}

    function approve(address _approved, uint256 _tokenId) public virtual override {
    }

    function setApprovalForAll(address _operator, bool _approved) public virtual override {
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public virtual override {
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory _data) public virtual override {
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public virtual override {
    }
}