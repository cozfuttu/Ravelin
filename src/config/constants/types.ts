export type IfoStatus = "coming_soon" | "live" | "finished";

export interface Ifo {
  id: string;
  isActive: boolean;
  address: string;
  name: string;
  subTitle?: string;
  description?: string;
  launchDate: string;
  launchTime: string;
  saleAmount: string;
  raiseAmount: string;
  cakeToBurn: string;
  projectSiteUrl: string;
  currency: string;
  currencyAddress: string;
  tokenDecimals: number;
  releaseBlockNumber: number;
}

export enum QuoteToken {
  "ADA" = "mADA",
  "RSHARE" = "RSHARE",
  "WFTM" = "WFTM",
  "MATIC" = "MATIC",
  "CAKE" = "CAKE",
  "BNT" = "BNT",
  "SYRUP" = "SYRUP",
  "USDC" = "USDC",
  "TWT" = "TWT",
  "UST" = "UST",
  "BPUL" = "BPUL",
  "GPUL" = "GPUL",
  "RAV" = "RAV",
  "GBNT" = "GBNT",
}

export enum PoolCategory {
  "COMMUNITY" = "Community",
  "CORE" = "Core",
  "BINANCE" = "Binance", // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string;
  137: string;
  250?: string;
  2001?: string;
}

export interface FarmConfig {
  pid: number;
  lpSymbol: string;
  lpAddresses: Address;
  lpSource?: string;
  tokenSymbol: string;
  tokenAddresses: Address;
  quoteTokenSymbol: QuoteToken;
  quoteTokenAdresses: Address;
  isHidden?: boolean;
  multiplier?: string;
  isTokenOnly?: boolean;
  isGenesis?: boolean;
  isRavPool?: boolean;
  isCommunity?: boolean;
  risk: number;
  harvestInterval?: number;
  dual?: {
    rewardPerBlock: number;
    earnLabel: string;
    endBlock: number;
  };
}

export interface InterstellarConfig {
  name: string;
  contractAddress: string;
  stakeLpAddress: string;
  rewardLpAddress: string;
  stakeTokenSymbol: string;
  rewardTokenSymbol: string;
  partnerWebsite?: string;
  partnerName?: string;
}

export type HunterMissionConfig = {
  missionId: number;
  partner?: string; // This is for the partnerships.
  partnerWebsite?: string;
  useUsdc?: boolean; // if the lp address is paired with USDC instead of the native token of the chain.
};

export interface FigthTurnData {
  id: string;
  animationName: string;
  minValue: number;
  maxValue: number;
}

export enum FighterId {
  "FIRST" = 1,
  "SECOND" = 2,
  "THIRD" = 3,
  "FOURTH" = 4,
}

export interface CombatData {
  id: string;
  oldHealths: number[];
  newHealths: number[];
  attackerIndex: number;
  animationName: string;
}

export interface HunterFightTurnData {
  takeDamage: FigthTurnData;
  block: FigthTurnData;
  shoot: FigthTurnData;
  heal: FigthTurnData;
  grenade: FigthTurnData;
}
