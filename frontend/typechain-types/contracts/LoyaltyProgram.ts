/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface LoyaltyProgramInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "accountBalance"
      | "addIssuer"
      | "buyProductOrClaimReward"
      | "decayPeriod"
      | "getRefferalRewardRate"
      | "getTokensOnOrderPurchase"
      | "initialIssuerTokens"
      | "issueTokenToLoyalUser"
      | "numberOfIssuers"
      | "owner"
      | "referralReward"
      | "removeIssuer"
      | "renounceOwnership"
      | "settlementRate"
      | "transferOwnership"
      | "updateDecayPeriod"
      | "updateReferralRewardRate"
      | "updateSettlementRate"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "GetTokenOnOrder"
      | "IssuerRecord"
      | "OwnershipTransferred"
      | "Refferal"
      | "SettlementRecord"
      | "TokenDecayed"
      | "TokenToLoyalUser"
      | "TokensTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "accountBalance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addIssuer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "buyProductOrClaimReward",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "decayPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getRefferalRewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokensOnOrderPurchase",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialIssuerTokens",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "issueTokenToLoyalUser",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfIssuers",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "referralReward",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "removeIssuer",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "settlementRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateDecayPeriod",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateReferralRewardRate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "updateSettlementRate",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "accountBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addIssuer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyProductOrClaimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decayPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRefferalRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokensOnOrderPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initialIssuerTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "issueTokenToLoyalUser",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberOfIssuers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "referralReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeIssuer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settlementRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateDecayPeriod",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateReferralRewardRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateSettlementRate",
    data: BytesLike
  ): Result;
}

export namespace GetTokenOnOrderEvent {
  export type InputTuple = [
    numberOfTokens: BigNumberish,
    orderAmount: BigNumberish,
    user: AddressLike,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    numberOfTokens: bigint,
    orderAmount: bigint,
    user: string,
    timestamp: bigint
  ];
  export interface OutputObject {
    numberOfTokens: bigint;
    orderAmount: bigint;
    user: string;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace IssuerRecordEvent {
  export type InputTuple = [
    issuer: AddressLike,
    tokens: BigNumberish,
    timestamp: BigNumberish,
    isAdded: boolean
  ];
  export type OutputTuple = [
    issuer: string,
    tokens: bigint,
    timestamp: bigint,
    isAdded: boolean
  ];
  export interface OutputObject {
    issuer: string;
    tokens: bigint;
    timestamp: bigint;
    isAdded: boolean;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RefferalEvent {
  export type InputTuple = [
    user: AddressLike,
    tokens: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [user: string, tokens: bigint, timestamp: bigint];
  export interface OutputObject {
    user: string;
    tokens: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SettlementRecordEvent {
  export type InputTuple = [
    tranferFrom: AddressLike,
    tokens: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    tranferFrom: string,
    tokens: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    tranferFrom: string;
    tokens: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenDecayedEvent {
  export type InputTuple = [
    user: AddressLike,
    tokens: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [user: string, tokens: bigint, timestamp: bigint];
  export interface OutputObject {
    user: string;
    tokens: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokenToLoyalUserEvent {
  export type InputTuple = [
    issuer: AddressLike,
    user: AddressLike,
    tokens: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    issuer: string,
    user: string,
    tokens: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    issuer: string;
    user: string;
    tokens: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace TokensTransferredEvent {
  export type InputTuple = [
    user: AddressLike,
    transferTo: AddressLike,
    tokens: BigNumberish,
    timestamp: BigNumberish
  ];
  export type OutputTuple = [
    user: string,
    transferTo: string,
    tokens: bigint,
    timestamp: bigint
  ];
  export interface OutputObject {
    user: string;
    transferTo: string;
    tokens: bigint;
    timestamp: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface LoyaltyProgram extends BaseContract {
  connect(runner?: ContractRunner | null): LoyaltyProgram;
  waitForDeployment(): Promise<this>;

  interface: LoyaltyProgramInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  accountBalance: TypedContractMethod<
    [_address: AddressLike],
    [bigint],
    "view"
  >;

  addIssuer: TypedContractMethod<[_address: AddressLike], [void], "nonpayable">;

  buyProductOrClaimReward: TypedContractMethod<
    [_tokens: BigNumberish, _transferTo: AddressLike],
    [void],
    "nonpayable"
  >;

  decayPeriod: TypedContractMethod<[], [bigint], "view">;

  getRefferalRewardRate: TypedContractMethod<[], [bigint], "view">;

  getTokensOnOrderPurchase: TypedContractMethod<
    [_orderAmount: BigNumberish, _numberOfTokens: BigNumberish],
    [void],
    "nonpayable"
  >;

  initialIssuerTokens: TypedContractMethod<[], [bigint], "view">;

  issueTokenToLoyalUser: TypedContractMethod<
    [_tokens: BigNumberish, _address: AddressLike],
    [void],
    "nonpayable"
  >;

  numberOfIssuers: TypedContractMethod<[], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  referralReward: TypedContractMethod<
    [_refferedBy: AddressLike],
    [void],
    "nonpayable"
  >;

  removeIssuer: TypedContractMethod<
    [_address: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  settlementRate: TypedContractMethod<[], [bigint], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateDecayPeriod: TypedContractMethod<
    [_period: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateReferralRewardRate: TypedContractMethod<
    [reward: BigNumberish],
    [void],
    "nonpayable"
  >;

  updateSettlementRate: TypedContractMethod<
    [_newRate: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "accountBalance"
  ): TypedContractMethod<[_address: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "addIssuer"
  ): TypedContractMethod<[_address: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "buyProductOrClaimReward"
  ): TypedContractMethod<
    [_tokens: BigNumberish, _transferTo: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "decayPeriod"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getRefferalRewardRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTokensOnOrderPurchase"
  ): TypedContractMethod<
    [_orderAmount: BigNumberish, _numberOfTokens: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "initialIssuerTokens"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "issueTokenToLoyalUser"
  ): TypedContractMethod<
    [_tokens: BigNumberish, _address: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "numberOfIssuers"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "referralReward"
  ): TypedContractMethod<[_refferedBy: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "removeIssuer"
  ): TypedContractMethod<[_address: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "settlementRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateDecayPeriod"
  ): TypedContractMethod<[_period: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateReferralRewardRate"
  ): TypedContractMethod<[reward: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateSettlementRate"
  ): TypedContractMethod<[_newRate: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "GetTokenOnOrder"
  ): TypedContractEvent<
    GetTokenOnOrderEvent.InputTuple,
    GetTokenOnOrderEvent.OutputTuple,
    GetTokenOnOrderEvent.OutputObject
  >;
  getEvent(
    key: "IssuerRecord"
  ): TypedContractEvent<
    IssuerRecordEvent.InputTuple,
    IssuerRecordEvent.OutputTuple,
    IssuerRecordEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Refferal"
  ): TypedContractEvent<
    RefferalEvent.InputTuple,
    RefferalEvent.OutputTuple,
    RefferalEvent.OutputObject
  >;
  getEvent(
    key: "SettlementRecord"
  ): TypedContractEvent<
    SettlementRecordEvent.InputTuple,
    SettlementRecordEvent.OutputTuple,
    SettlementRecordEvent.OutputObject
  >;
  getEvent(
    key: "TokenDecayed"
  ): TypedContractEvent<
    TokenDecayedEvent.InputTuple,
    TokenDecayedEvent.OutputTuple,
    TokenDecayedEvent.OutputObject
  >;
  getEvent(
    key: "TokenToLoyalUser"
  ): TypedContractEvent<
    TokenToLoyalUserEvent.InputTuple,
    TokenToLoyalUserEvent.OutputTuple,
    TokenToLoyalUserEvent.OutputObject
  >;
  getEvent(
    key: "TokensTransferred"
  ): TypedContractEvent<
    TokensTransferredEvent.InputTuple,
    TokensTransferredEvent.OutputTuple,
    TokensTransferredEvent.OutputObject
  >;

  filters: {
    "GetTokenOnOrder(uint256,uint256,address,uint256)": TypedContractEvent<
      GetTokenOnOrderEvent.InputTuple,
      GetTokenOnOrderEvent.OutputTuple,
      GetTokenOnOrderEvent.OutputObject
    >;
    GetTokenOnOrder: TypedContractEvent<
      GetTokenOnOrderEvent.InputTuple,
      GetTokenOnOrderEvent.OutputTuple,
      GetTokenOnOrderEvent.OutputObject
    >;

    "IssuerRecord(address,uint256,uint256,bool)": TypedContractEvent<
      IssuerRecordEvent.InputTuple,
      IssuerRecordEvent.OutputTuple,
      IssuerRecordEvent.OutputObject
    >;
    IssuerRecord: TypedContractEvent<
      IssuerRecordEvent.InputTuple,
      IssuerRecordEvent.OutputTuple,
      IssuerRecordEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Refferal(address,uint256,uint256)": TypedContractEvent<
      RefferalEvent.InputTuple,
      RefferalEvent.OutputTuple,
      RefferalEvent.OutputObject
    >;
    Refferal: TypedContractEvent<
      RefferalEvent.InputTuple,
      RefferalEvent.OutputTuple,
      RefferalEvent.OutputObject
    >;

    "SettlementRecord(address,uint256,uint256)": TypedContractEvent<
      SettlementRecordEvent.InputTuple,
      SettlementRecordEvent.OutputTuple,
      SettlementRecordEvent.OutputObject
    >;
    SettlementRecord: TypedContractEvent<
      SettlementRecordEvent.InputTuple,
      SettlementRecordEvent.OutputTuple,
      SettlementRecordEvent.OutputObject
    >;

    "TokenDecayed(address,uint256,uint256)": TypedContractEvent<
      TokenDecayedEvent.InputTuple,
      TokenDecayedEvent.OutputTuple,
      TokenDecayedEvent.OutputObject
    >;
    TokenDecayed: TypedContractEvent<
      TokenDecayedEvent.InputTuple,
      TokenDecayedEvent.OutputTuple,
      TokenDecayedEvent.OutputObject
    >;

    "TokenToLoyalUser(address,address,uint256,uint256)": TypedContractEvent<
      TokenToLoyalUserEvent.InputTuple,
      TokenToLoyalUserEvent.OutputTuple,
      TokenToLoyalUserEvent.OutputObject
    >;
    TokenToLoyalUser: TypedContractEvent<
      TokenToLoyalUserEvent.InputTuple,
      TokenToLoyalUserEvent.OutputTuple,
      TokenToLoyalUserEvent.OutputObject
    >;

    "TokensTransferred(address,address,uint256,uint256)": TypedContractEvent<
      TokensTransferredEvent.InputTuple,
      TokensTransferredEvent.OutputTuple,
      TokensTransferredEvent.OutputObject
    >;
    TokensTransferred: TypedContractEvent<
      TokensTransferredEvent.InputTuple,
      TokensTransferredEvent.OutputTuple,
      TokensTransferredEvent.OutputObject
    >;
  };
}
