// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ElectionResults {

    address public owner;
    mapping(address => bool) public officers;

    struct Result {
        string pollingUnit;
        string party;
        uint256 votes;
        uint256 timestamp;
    }

    Result[] public results;

    event ResultSubmitted(
        string pollingUnit,
        string party,
        uint256 votes,
        uint256 timestamp
    );

    event OfficerAdded(address officer);
    event OfficerRemoved(address officer);

    constructor() {
        owner = msg.sender;
        officers[owner] = true; // owner is automatically an officer
    }

    modifier onlyOfficer() {
        require(officers[msg.sender], "Not authorized");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this");
        _;
    }

    function addOfficer(address _officer) public onlyOwner {
        officers[_officer] = true;
        emit OfficerAdded(_officer);
    }

    function removeOfficer(address _officer) public onlyOwner {
        officers[_officer] = false;
        emit OfficerRemoved(_officer);
    }

    function submitResult(
        string memory _pollingUnit,
        string memory _party,
        uint256 _votes
    ) public onlyOfficer {
        results.push(Result({
            pollingUnit: _pollingUnit,
            party: _party,
            votes: _votes,
            timestamp: block.timestamp
        }));

        emit ResultSubmitted(
            _pollingUnit,
            _party,
            _votes,
            block.timestamp
        );
    }

    function getResults() public view returns (Result[] memory) {
        return results;
    }
}