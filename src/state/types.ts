import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig, NftConfig, MissionNftConfig, PolyGalacticHunterMissionNftConfig, PetNftConfig, InterstellarConfig } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  // quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: number
  depositFeeBP?: number
  gammaPulsarPerBlock?: number
  decimals?: number
  totalLpStaked?: number
  poolEndTime?: number
  isStarted?: boolean
  userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
    nextHarvestUntil: number
  }
}

export interface Mason {
  allowance: string
  tokenBalance: string
  lastSnapshotIndex: string
  rewardEarned: string
  epochTimerStart: string
  canWithdraw: boolean
  canClaimReward: boolean
  earned: string
}

export interface Masonry {
  tokenAmount?: string
  lpTotalInQuoteToken?: string
  tokenPriceVsQuote?: string
  tshareDecimals?: number
  quoteTokenDecimals?: number
  totalRshareStaked?: number
  epoch?: string
  nextEpochPoint?: string
  tombPrice?: string
  userData?: Mason
}

// Slices states

export interface FarmsState {
  data: Farm[]
}

export interface MasonryState {
  data: Masonry
}

// Global state

export interface State {
  farms: FarmsState
  masonry: MasonryState
}