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
