// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;



contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;
        assert(msg.sender == owner);
        balance += _amount;
        assert(balance == _previousBalance + _amount);
        emit Deposit(_amount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
           
        }
        balance -= _withdrawAmount;
        assert(balance == (_previousBalance - _withdrawAmount));
        emit Withdraw(_withdrawAmount);
    }
}
