/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  LoyaltyProgram,
  LoyaltyProgramInterface,
} from "../../contracts/LoyaltyProgram";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_initialIssuerTokens",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "numberOfTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "orderAmount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "GetTokenOnOrder",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAdded",
        type: "bool",
      },
    ],
    name: "IssuerRecord",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tranferFrom",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "SettlementRecord",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "issuer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TokenToLoyalUser",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "transferTo",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TokensTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "accountBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "addIssuer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokens",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_transferTo",
        type: "address",
      },
    ],
    name: "buyProductOrClaimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_orderAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_numberOfTokens",
        type: "uint256",
      },
    ],
    name: "getTokensOnOrderPurchase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "giveApproval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokens",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "issueTokenToLoyalUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfIssuers",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "removeIssuer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001f6438038062001f648339818101604052810190620000379190620002f8565b620000576200004b6200018760201b60201c565b6200018f60201b60201c565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506107d0600381905550670de0b6b3a764000081620000f891906200036e565b6004819055506703782dace9d900006007604051620001179062000414565b908152602001604051809103902081905550674563918244f40000600760405162000142906200047b565b908152602001604051809103902081905550678ac7230489e8000060076040516200016d90620004e2565b9081526020016040518091039020819055505050620004f9565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002858262000258565b9050919050565b620002978162000278565b8114620002a357600080fd5b50565b600081519050620002b7816200028c565b92915050565b6000819050919050565b620002d281620002bd565b8114620002de57600080fd5b50565b600081519050620002f281620002c7565b92915050565b6000806040838503121562000312576200031162000253565b5b60006200032285828601620002a6565b92505060206200033585828601620002e1565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200037b82620002bd565b91506200038883620002bd565b92508282026200039881620002bd565b91508282048414831517620003b257620003b16200033f565b5b5092915050565b600081905092915050565b7f5055524348415345000000000000000000000000000000000000000000000000600082015250565b6000620003fc600883620003b9565b91506200040982620003c4565b600882019050919050565b60006200042182620003ed565b9150819050919050565b7f524546455252414c000000000000000000000000000000000000000000000000600082015250565b600062000463600883620003b9565b915062000470826200042b565b600882019050919050565b6000620004888262000454565b9150819050919050565b7f4c4f59414c5f555345525f544f4b454e53000000000000000000000000000000600082015250565b6000620004ca601183620003b9565b9150620004d78262000492565b601182019050919050565b6000620004ef82620004bb565b9150819050919050565b611a5b80620005096000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80638da5cb5b116100715780638da5cb5b14610116578063a46a604314610134578063b4ea7a5d14610152578063d294cb0f1461016e578063f2fde38b1461019e578063fd8de053146101ba576100a9565b806304cdbf6a146100ae57806320694db0146100ca57806347bc7093146100e6578063715018a6146101025780638b2638781461010c575b600080fd5b6100c860048036038101906100c39190611055565b6101d6565b005b6100e460048036038101906100df9190611095565b6103ce565b005b61010060048036038101906100fb9190611095565b610535565b005b61010a6105f7565b005b61011461060b565b005b61011e61078a565b60405161012b91906110d1565b60405180910390f35b61013c6107b3565b60405161014991906110fb565b60405180910390f35b61016c60048036038101906101679190611055565b6107bf565b005b61018860048036038101906101839190611095565b6109f6565b60405161019591906110fb565b60405180910390f35b6101b860048036038101906101b39190611095565b610a9b565b005b6101d460048036038101906101cf9190611116565b610b1e565b005b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610262576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610259906111d9565b60405180910390fd5b81600760405161027190611250565b908152602001604051809103902054116102c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102b7906112d7565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3383856040518463ffffffff1660e01b815260040161031f939291906112f7565b6020604051808303816000875af115801561033e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103629190611366565b508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167ff96406bba1dc515d19dd3bf6c87e121d391e899e9ca895e65cb64fbe9493e15c84426040516103c2929190611393565b60405180910390a35050565b6103d6610cc9565b6001600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506104386006610d47565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd33836004546040518463ffffffff1660e01b8152600401610499939291906112f7565b6020604051808303816000875af11580156104b8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104dc9190611366565b508073ffffffffffffffffffffffffffffffffffffffff167f1748a4b832fb6f2a3f1c93aeb41473fe4bc2f156d4943591003fd384fb475f9660045442600160405161052a939291906113cb565b60405180910390a250565b61053d610cc9565b6000600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061059f6006610d5d565b8073ffffffffffffffffffffffffffffffffffffffff167f1748a4b832fb6f2a3f1c93aeb41473fe4bc2f156d4943591003fd384fb475f966004544260006040516105ec939291906113cb565b60405180910390a250565b6105ff610cc9565b6106096000610db9565b565b610613610cc9565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663095ea7b330600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166318160ddd6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156106c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106e59190611417565b6040518363ffffffff1660e01b8152600401610702929190611444565b6020604051808303816000875af1158015610721573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107459190611366565b905080610787576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161077e906114df565b60405180910390fd5b50565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60068060000154905081565b60008211610802576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107f99061154b565b60405180910390fd5b600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1661088e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610885906115dd565b60405180910390fd5b6000610899336109f6565b90508281116108dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d49061166f565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3384866040518463ffffffff1660e01b815260040161093c939291906112f7565b6020604051808303816000875af115801561095b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097f9190611366565b5061098a8383610e7d565b8173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f822a0f1c29fca2c743650969736c315e9c7dc38972549bc35637169f07de976985426040516109e9929190611393565b60405180910390a3505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b8152600401610a5391906110d1565b602060405180830381865afa158015610a70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a949190611417565b9050919050565b610aa3610cc9565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610b12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b0990611701565b60405180910390fd5b610b1b81610db9565b50565b600354821015610b63576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b5a90611793565b60405180910390fd5b68056bc75e2d631000008110610bae576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba590611825565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633846040518463ffffffff1660e01b8152600401610c2f939291906112f7565b6020604051808303816000875af1158015610c4e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c729190611366565b503373ffffffffffffffffffffffffffffffffffffffff167fcbb6412e26a7ec46344dd071a7b74e95f3bff4cca7e777a05e829f5a8f32bd58828442604051610cbd93929190611845565b60405180910390a25050565b610cd1610fb4565b73ffffffffffffffffffffffffffffffffffffffff16610cef61078a565b73ffffffffffffffffffffffffffffffffffffffff1614610d45576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3c906118c8565b60405180910390fd5b565b6001816000016000828254019250508190555050565b60008160000154905060008111610da9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610da090611934565b60405180910390fd5b6001810382600001819055505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60006064601984610e8e9190611983565b610e9891906119f4565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd83600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518463ffffffff1660e01b8152600401610f1b939291906112f7565b6020604051808303816000875af1158015610f3a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f5e9190611366565b508173ffffffffffffffffffffffffffffffffffffffff167f917cb84521609546a91ffd95dedaf28f0604fd385a7d27a7021d2282066dc0108442604051610fa7929190611393565b60405180910390a2505050565b600033905090565b600080fd5b6000819050919050565b610fd481610fc1565b8114610fdf57600080fd5b50565b600081359050610ff181610fcb565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061102282610ff7565b9050919050565b61103281611017565b811461103d57600080fd5b50565b60008135905061104f81611029565b92915050565b6000806040838503121561106c5761106b610fbc565b5b600061107a85828601610fe2565b925050602061108b85828601611040565b9150509250929050565b6000602082840312156110ab576110aa610fbc565b5b60006110b984828501611040565b91505092915050565b6110cb81611017565b82525050565b60006020820190506110e660008301846110c2565b92915050565b6110f581610fc1565b82525050565b600060208201905061111060008301846110ec565b92915050565b6000806040838503121561112d5761112c610fbc565b5b600061113b85828601610fe2565b925050602061114c85828601610fe2565b9150509250929050565b600082825260208201905092915050565b7f4f6e6c7920617574686f72697a6564206973737565722063616e2063616c6c2060008201527f746869732066756e6374696f6e00000000000000000000000000000000000000602082015250565b60006111c3602d83611156565b91506111ce82611167565b604082019050919050565b600060208201905081810360008301526111f2816111b6565b9050919050565b600081905092915050565b7f4c4f59414c5f555345525f544f4b454e53000000000000000000000000000000600082015250565b600061123a6011836111f9565b915061124582611204565b601182019050919050565b600061125b8261122d565b9150819050919050565b7f596f752063616e206f6e6c79206973737565206c657373207468616e2031302060008201527f746f6b656e7320746f206c6f79616c2075736572730000000000000000000000602082015250565b60006112c1603583611156565b91506112cc82611265565b604082019050919050565b600060208201905081810360008301526112f0816112b4565b9050919050565b600060608201905061130c60008301866110c2565b61131960208301856110c2565b61132660408301846110ec565b949350505050565b60008115159050919050565b6113438161132e565b811461134e57600080fd5b50565b6000815190506113608161133a565b92915050565b60006020828403121561137c5761137b610fbc565b5b600061138a84828501611351565b91505092915050565b60006040820190506113a860008301856110ec565b6113b560208301846110ec565b9392505050565b6113c58161132e565b82525050565b60006060820190506113e060008301866110ec565b6113ed60208301856110ec565b6113fa60408301846113bc565b949350505050565b60008151905061141181610fcb565b92915050565b60006020828403121561142d5761142c610fbc565b5b600061143b84828501611402565b91505092915050565b600060408201905061145960008301856110c2565b61146660208301846110ec565b9392505050565b7f6769766520617070726f76616c20666f7220616c6c2074686520746f6b656e2060008201527f746f206265207472616e73666572656400000000000000000000000000000000602082015250565b60006114c9603083611156565b91506114d48261146d565b604082019050919050565b600060208201905081810360008301526114f8816114bc565b9050919050565b7f546f6b656e732073686f756c642062652067726561746572207468616e203000600082015250565b6000611535601f83611156565b9150611540826114ff565b602082019050919050565b6000602082019050818103600083015261156481611528565b9050919050565b7f5472616e7366657220746f206d75737420626520616c6c6f776564206973737560008201527f65727320286272616e64206f722073656c6c6572290000000000000000000000602082015250565b60006115c7603583611156565b91506115d28261156b565b604082019050919050565b600060208201905081810360008301526115f6816115ba565b9050919050565b7f557365722073686f756c6420686176652062616c616e6365206772656174657260008201527f207468616e206e756d626572206f6620746f6b656e7320726571756972656421602082015250565b6000611659604083611156565b9150611664826115fd565b604082019050919050565b600060208201905081810360008301526116888161164c565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006116eb602683611156565b91506116f68261168f565b604082019050919050565b6000602082019050818103600083015261171a816116de565b9050919050565b7f4f7264657220616d6f756e74206d75737420626520677265617465722074686160008201527f6e20746865206d696e696d756d206f7264657220616d6f756e74000000000000602082015250565b600061177d603a83611156565b915061178882611721565b604082019050919050565b600060208201905081810360008301526117ac81611770565b9050919050565b7f43616e6e6f7420616c6c6f6361746564206d6f7265207468616e20313030207460008201527f6f6b656e73000000000000000000000000000000000000000000000000000000602082015250565b600061180f602583611156565b915061181a826117b3565b604082019050919050565b6000602082019050818103600083015261183e81611802565b9050919050565b600060608201905061185a60008301866110ec565b61186760208301856110ec565b61187460408301846110ec565b949350505050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006118b2602083611156565b91506118bd8261187c565b602082019050919050565b600060208201905081810360008301526118e1816118a5565b9050919050565b7f436f756e7465723a2064656372656d656e74206f766572666c6f770000000000600082015250565b600061191e601b83611156565b9150611929826118e8565b602082019050919050565b6000602082019050818103600083015261194d81611911565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061198e82610fc1565b915061199983610fc1565b92508282026119a781610fc1565b915082820484148315176119be576119bd611954565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b60006119ff82610fc1565b9150611a0a83610fc1565b925082611a1a57611a196119c5565b5b82820490509291505056fea2646970667358221220475bd7586d242fa9bd21d6ddc4c84f9484bae521f2bd6eeca1fec76ffebfe99a64736f6c63430008130033";

type LoyaltyProgramConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LoyaltyProgramConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LoyaltyProgram__factory extends ContractFactory {
  constructor(...args: LoyaltyProgramConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _tokenAddress: AddressLike,
    _initialIssuerTokens: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _tokenAddress,
      _initialIssuerTokens,
      overrides || {}
    );
  }
  override deploy(
    _tokenAddress: AddressLike,
    _initialIssuerTokens: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _tokenAddress,
      _initialIssuerTokens,
      overrides || {}
    ) as Promise<
      LoyaltyProgram & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): LoyaltyProgram__factory {
    return super.connect(runner) as LoyaltyProgram__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LoyaltyProgramInterface {
    return new Interface(_abi) as LoyaltyProgramInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): LoyaltyProgram {
    return new Contract(address, _abi, runner) as unknown as LoyaltyProgram;
  }
}