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
  name: string;
  description: string;
  imageUri: string;
  detailsImageUri: string;
  partnerImageUri?: string;
  playableWith: string;
  gain: string;
  partner?: string; // This is for the partnerships.
  partnerWebsite?: string;
  lpAddressOfPaidToken: string; // This is for receiving the native price of the paid token.
  lpAddressOfEarnedToken: string; // This is for receiving the native price of the earned token.
  useUsdc?: boolean; // if the lp address is paired with USDC instead of the native token of the chain.
};
