import BigNumber from "bignumber.js";
import { FarmConfig } from "config/constants/types";

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber;
  // quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber;
  tokenPriceVsQuote?: BigNumber;
  poolWeight?: number;
  depositFeeBP?: number;
  gammaPulsarPerBlock?: number;
  decimals?: number;
  quoteTokenDecimals?: number;
  totalLpStaked?: number;
  poolEndTime?: number;
  poolStartTime?: number;
  lastRewardTime?: number;
  isStarted?: boolean;
  userData?: {
    allowance: BigNumber;
    tokenBalance: BigNumber;
    stakedBalance: BigNumber;
    earnings: BigNumber;
    nextHarvestUntil: number;
  };
}

export interface Mason {
  allowance: string;
  tokenBalance: string;
  lastSnapshotIndex: string;
  rewardEarned: string;
  epochTimerStart: string;
  canWithdraw: boolean;
  canClaimReward: boolean;
  earned: string;
  stakedBalance: string;
}

export interface Masonry {
  tokenAmount?: string;
  lpTotalInQuoteToken?: string;
  tokenPriceVsQuote?: string;
  tshareDecimals?: number;
  quoteTokenDecimals?: number;
  totalRshareStaked?: number;
  epoch?: string;
  nextEpochPoint?: string;
  tombPrice?: string;
  withdrawLockupEpochs?: string;
  rewardLockupEpochs?: string;
  userData?: Mason;
}

export interface Treasury {
  twap?: string;
  epoch?: string;
  nextEpochPoint?: string;
  epochSupplyContractionLeft?: string;
  startTime?: string;
  previousEpochTombPrice?: string;
  discountPercent?: string;
  premiumPercent?: string;
  reserve?: string;
  burnableTombLeft?: string;
  redeemableBonds?: string;
  bondDiscountRate?: string;
  bondPremiumRate?: string;
  tombCirculatingSupply?: string;
  tombPrice?: string;
  period?: string;
  unclaimedDevFund?: string;
  unclaimedTreasuryFund?: string;
  userData?: TreasuryUser;
}

export interface TreasuryUser {
  allowanceRav: string;
  allowanceRbond: string;
  tokenBalanceRav: string;
  tokenBalanceRbond: string;
}

// Slices states

export interface FarmsState {
  data: Farm[];
}

export interface MasonryState {
  data: Masonry;
}

export interface TreasuryState {
  data: Treasury;
}

// Global state

export interface State {
  farms: FarmsState;
  masonry: MasonryState;
  treasury: TreasuryState;
}
