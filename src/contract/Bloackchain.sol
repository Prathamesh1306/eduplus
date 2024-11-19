// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Blockchain {
    address public owner = msg.sender;
    uint256 counter;
    struct Student {
        string uniqueHashValue;
    }

    mapping(uint256 => Student) studentCredentialHash;

    modifier _onlyAdmin(address from) {
        require(from == owner);
        _;
    }

    // Admin will issue data
    function issueCredentials(string memory _uniqueHashValue)
        public
        _onlyAdmin(msg.sender)
    {
        studentCredentialHash[counter] = Student({
            uniqueHashValue: _uniqueHashValue
        });
        counter++;
    }

    // Get all issued credentials
    function getIssuedCredentials() public view returns (Student[] memory) {
        Student[] memory allCredentials = new Student[](counter);
        for (uint256 i = 0; i < counter; i++) {
            allCredentials[i] = studentCredentialHash[i];
        }
        return allCredentials;
    }

    // HR will verify the data
    function verifyCredentials(string memory hashValue) public view returns (bool found) {
        for (uint256 i = 0; i < counter; i++) {
            if (keccak256(abi.encodePacked(studentCredentialHash[i].uniqueHashValue)) == keccak256(abi.encodePacked(hashValue))) {
                return true;
            }
        }
        return false;
    }
}
