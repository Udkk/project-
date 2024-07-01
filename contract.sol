// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Contract{

    uint x;

    function setdata(uint _x) public {
        x = _x;
    }

    function readdata() public view returns (uint){
        return x;
    }
}