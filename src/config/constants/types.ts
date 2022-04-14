import BigNumber from 'bignumber.js'

export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
}

export enum QuoteToken {
  'ADA' = 'ADA',
  'WFTM' = 'WFTM',
  'MATIC' = 'MATIC',
  'CAKE' = 'CAKE',
  'BNT' = 'BNT',
  'SYRUP' = 'SYRUP',
  'USDC' = 'USDC',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'BPUL' = 'BPUL',
  'GPUL' = 'GPUL',
  'RAV' = 'RAV',
  'GBNT' = 'GBNT',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string
  137: string
  250?: string
  2001?: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  isHidden?: boolean
  multiplier?: string
  isTokenOnly?: boolean
  isGenesis?: boolean
  isRavPool?: boolean
  isCommunity?: boolean
  risk: number
  harvestInterval?: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
}

export interface InterstellarConfig {
  name: string
  contractAddress: string
  stakeLpAddress: string
  rewardLpAddress: string
  stakeTokenSymbol: string
  rewardTokenSymbol: string
  partnerWebsite?: string
  partnerName?: string
}

export type NftConfig = {
  isUtilityNft?: boolean
  isArtNft?: boolean
  isGameNft?: boolean
  isMissionNft?: boolean
  id?: number
  name: string
  description: string
  typeId: number
  rarity?: number
  price: BigNumber
  maxSupply: number
  totalSupply?: number
  originalImage: string
  previewImage: string
  address: string
}

export type BountyHunterConfig = {
  name: string
  typeId: number
}

export type MissionNftConfig = {
  name: string
  description: string
  details: string
  typeId: number
  missionType: number
  imageUri: string
  detailsImageUri: string
}

export type PolyGalacticHunterMissionNftConfig = {
  typeId: number
  partnerImageUri?: string
  playableWith?: string
  gain?: string
  gainValue?: string
  partner?: string // This is for the partnerships.
  partnerWebsite?: string
  lpAddressOfPayMatic?: string // This is for receiving the MATIC price of the paid token.
  lpAddressOfEarnMatic?: string // This is for receiving the MATIC price of the earned token.
  useUsdc?: boolean
}

export type PetNftConfig = {
  name: string
  index: number
  image: string
}

export type GameConfig = {
  name: string
  description: string
  missionId: number
  price: BigNumber
  image: string
}
