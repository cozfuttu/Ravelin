import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import genesisABI from 'config/abi/genesisPools.json'
import rsharePoolsABI from 'config/abi/rsharePools.json'
import multicall from 'utils/multicall'
import { getGenesisPoolsAddress, getRsharePoolsAddress } from 'utils/addressHelpers'
import { publicFarmsConfig } from 'config/constants/farms'
import { QuoteToken } from '../../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchFarms = async () => {
  const data = await Promise.all(
    publicFarmsConfig.map(async (farmConfig) => {
      const lpAdress = farmConfig.lpAddresses[CHAIN_ID]

      const calls = [
        // Balance of token in the LP contract
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of quote token on LP contract
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAdress],
        },
        // Balance of LP tokens in the master chef contract
        {
          address: farmConfig.isTokenOnly ? farmConfig.tokenAddresses[CHAIN_ID] : lpAdress,
          name: 'balanceOf',
          params: [farmConfig.isGenesis ? getGenesisPoolsAddress() : getRsharePoolsAddress()],
        },
        // Total supply of LP tokens
        {
          address: lpAdress,
          name: 'totalSupply',
        },
        // Token decimals
        {
          address: farmConfig.tokenAddresses[CHAIN_ID],
          name: 'decimals',
        },
        // Quote token decimals
        {
          address: farmConfig.quoteTokenAdresses[CHAIN_ID],
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        quoteTokenBlanceLP,
        lpTokenBalanceMC,
        lpTotalSupply,
        tokenDecimals,
        quoteTokenDecimals,
      ] = await multicall(erc20, calls)

      let tokenAmount
      let lpTotalInQuoteToken
      let tokenPriceVsQuote
      if (farmConfig.isTokenOnly) {
        const decimalCount = farmConfig.quoteTokenSymbol === QuoteToken.USDC ? 6 : 18
        tokenAmount = new BigNumber(lpTokenBalanceMC).div(new BigNumber(10).pow(decimalCount))
        if (farmConfig.tokenSymbol === QuoteToken.USDC && farmConfig.quoteTokenSymbol === QuoteToken.USDC) {
          tokenPriceVsQuote = new BigNumber(1)
        } else {
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP))
        }

        lpTotalInQuoteToken = tokenAmount.times(tokenPriceVsQuote)
      } else {
        // Ratio in % a LP tokens that are in staking, vs the total number in circulation
        const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

        // Total value in staking in quote token value
        lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(quoteTokenDecimals))
          .times(new BigNumber(2))
          .times(lpTokenRatio)

        // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
        tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
        const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
          .div(new BigNumber(10).pow(quoteTokenDecimals))
          .times(lpTokenRatio)

        if (tokenAmount.comparedTo(0) > 0) {
          tokenPriceVsQuote = quoteTokenAmount.div(tokenAmount)
        } else if (farmConfig.quoteTokenSymbol === QuoteToken.USDC) {
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP)
            .div(new BigNumber(tokenBalanceLP))
            .times(new BigNumber(10).pow(12))
        } else {
          tokenPriceVsQuote = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(tokenBalanceLP))
        }
      }

      
      let info
      let totalAllocPoint
      let poolEndTimee
      let gammaPulsarPerBlock
      let allocPoint
      let poolWeight
      let isStarted
      let poolEndTime

        try {
          [info, totalAllocPoint, poolEndTimee, gammaPulsarPerBlock] = await multicall(farmConfig.isGenesis ? genesisABI : rsharePoolsABI, [
            {
              address: farmConfig.isGenesis ? getGenesisPoolsAddress() : getRsharePoolsAddress(),
              name: 'poolInfo',
              params: [farmConfig.pid],
            },
            {
              address: farmConfig.isGenesis ? getGenesisPoolsAddress() : getRsharePoolsAddress(),
              name: 'totalAllocPoint',
            },
            {
              address: farmConfig.isGenesis ? getGenesisPoolsAddress() : getRsharePoolsAddress(),
              name: 'poolEndTime',
            },
            {
              address: farmConfig.isGenesis ? getGenesisPoolsAddress() : getRsharePoolsAddress(),
              name: farmConfig.isGenesis ? 'tombPerSecond' : 'tSharePerSecond',
            },
          ])

          allocPoint = new BigNumber(info.allocPoint._hex)
          poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
          poolEndTime = new BigNumber(poolEndTimee[0]._hex)
          isStarted = info.isStarted
        } catch (error) {
          console.log('ABI poolInfo call error')
        }

      return {
        ...farmConfig,
        tokenAmount: tokenAmount.toJSON(),
        // quoteTokenAmount: quoteTokenAmount,
        lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
        tokenPriceVsQuote: tokenPriceVsQuote.toJSON(),
        poolWeight: poolWeight?.toNumber(),
        multiplier: allocPoint ? `${allocPoint.div(100).toString()}X` : '-',
        depositFeeBP: info?.depositFeeBP,
        gammaPulsarPerBlock: new BigNumber(gammaPulsarPerBlock).toNumber(),
        decimals: tokenDecimals,
        totalLpStaked: lpTokenBalanceMC / 1e18,
        poolEndTime: poolEndTime?.toNumber(),
        isStarted,
      }
    }),
  )
  return data
}

export default fetchFarms
