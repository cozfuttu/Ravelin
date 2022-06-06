import BigNumber from "bignumber.js";
import {
  FarmConfig,
  HunterMissionConfig,
  InterstellarConfig,
} from "config/constants/types";

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

export interface Interstellar extends InterstellarConfig {
  stakeTokenAddress?: string;
  rewardTokenAddress?: string;
  stakedTokenAmount?: BigNumber;
  rewardTokenAmount?: BigNumber;
  rewardTokenPerBlock?: number;
  stakedTokenDecimals?: number;
  rewardTokenDecimals?: number;
  stakeTokenPrice?: BigNumber;
  rewardTokenPrice?: BigNumber;
  startBlock?: number;
  endBlock?: number;
  userData?: {
    allowance: BigNumber;
    tokenBalance: BigNumber;
    stakedBalance: BigNumber;
    earnings: BigNumber;
  };
}

export interface HunterMissionData extends HunterMissionConfig {
  multiple: number; // idk
  requiredRarity: number; // required least hunter rarity in order to start the mission
  xp: number; // rewarded xp of the mission
  doNotLoseXp: number; // saved xp percentage after mission failure
  paidTokenAddress: string; // the token address of mission's cost
  earnedTokenAddress: string; // the token address of mission's reward
  costAddress: string; // the wallet address which paid tokens transferred to
  price: number; // cost of the mission
  reward: number; // reward of the mission
  totalTry: number; // how many times the mission was tried
  totalSuccess: number; // how many times the mission was succeded
  totalFail: number; // how many times the mission was failed
  totalReward: number; // total distributed reward of the mission
  paidTokenPriceUsdc: string; // value of the token in $ which is paid to start the mission.
  earnedTokenPriceUsdc: string; // value of the token in $ which is rewarded after the mission.
  paidTokenDecimals: number; // decimals of the token which is rewarded after the mission.
  earnedTokenDecimals: number; // decimals of the token which is paid to start the mission.
  balanceOfTokenInContract: number; // rewarded token amount in the contract
  nextPlayTime: number; // the ETA that the user can start another mission
  cooldown: number; // the time difference from now that the user can start another mission
  profitPercentage: number; // how profitable the mission is
  canBeThey: boolean; // true if the mission can be played.
  name: string; // moved here from config
  imageUri: string; // moved here from config
  partnerImageUri?: string; // moved here from config
  playableWith: string; // moved here from config
  gain: string; // moved here from config
  lpAddressOfPaidToken: string; // This is for receiving the native price of the paid token. (no longer in the config)
  lpAddressOfEarnedToken: string; // This is for receiving the native price of the earned token. (no longer in the config)
}

export interface HunterUserData {
  allowanceHunter: string;
  tokenId: number;
  maxNftLevel: number;
  totalTry: number;
  totalSuccess: number;
  totalReward: number;
  userHasHunter: boolean;
  hunterName: string;
  hunterLevel: number;
  hunterRarity: number;
  hunterXp: number;
  hunterNeedXpToLevelUp: number;
  hunterTotalXp: number;
  hunterOwner: string;
  hunterCreator: string;
  hunterTotalTry: number;
  hunterTotalSuccess: number;
  hunterNextTryBlock: number;
  hunterInMission: boolean;
  missionData: {
    allowanceMission: string;
    hunterNextTryTime: number;
  }[];
}

export interface Hunter {
  userData: HunterUserData;
  missions: HunterMissionData[];
  hunterPrice: number;
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

export interface InterstellarsState {
  data: Interstellar[];
}

// Global state

export interface State {
  farms: FarmsState;
  masonry: MasonryState;
  treasury: TreasuryState;
  interstellar: InterstellarsState;
  hunter: Hunter;
}
