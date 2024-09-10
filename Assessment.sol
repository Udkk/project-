// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
   uint cost=0;
   function company(uint comp) public  {
    cost=0;
      if(comp==1){
        cost+=1000;
      }
      else if(comp==2){
        cost+=2000;
      }
      else if(comp==3){
        cost+=3000;
      } 
      else{
        cost+=4000;
      }
   }
   function size(uint st) public {
    if(st==3){
      cost+=200;
    }
    else if(st==4){
      cost+=300;
    }
    else{
      cost+=500;
    }
    
   }
   function getcost() public view returns(uint){
    return cost;
   }
}
