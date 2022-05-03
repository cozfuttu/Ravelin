import BigNumber from 'bignumber.js'
import { useBurnedBalanceRav, useTotalSupplyRav } from 'hooks/useTokenBalance'
import React from 'react'
import { usePriceBnbBusd, usePriceRavBusd } from 'state/hooks'
import { Masonry } from 'state/types'
import Card from './Card'

interface CardProps {
  masonry: Masonry
}

const EXPANSION_BREAKPOINTS = [500000, 1000000, 1500000, 2000000, 5000000, 10000000, 20000000, 50000000]
const EPOCH_AMOUNT_IN_YEAR = 365 * 24 / 6 // 1 year * 24 hours / epoch period

const APRCard: React.FC<CardProps> = ({ masonry }) => {
  //  const tombPrice = new BigNumber(masonry.tombPrice)

  const cakeTotalSupply = useTotalSupplyRav()
  const cakeBurnedSupply = useBurnedBalanceRav()
  const ravPrice = usePriceRavBusd()
  const adaPrice = usePriceBnbBusd()

  const circSupplyRav = cakeTotalSupply ? cakeTotalSupply.minus(cakeBurnedSupply).div(1e18).toNumber() : 0

  let expansionRate: number;
  if (circSupplyRav < EXPANSION_BREAKPOINTS[0]) expansionRate = 0.045
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[1]) expansionRate = 0.04
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[2]) expansionRate = 0.035
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[3]) expansionRate = 0.03
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[4]) expansionRate = 0.025
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[5]) expansionRate = 0.02
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[6]) expansionRate = 0.015
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[7]) expansionRate = 0.0125
  else expansionRate = 0.01

  const ravRewardPerEpoch = circSupplyRav * expansionRate
  const ravRewardPerYear = ravRewardPerEpoch * EPOCH_AMOUNT_IN_YEAR

  const totalValue = new BigNumber(masonry.lpTotalInQuoteToken || 0).times(adaPrice)

  let apy = ravPrice.times(ravRewardPerYear)

  if (totalValue.comparedTo(0) > 0) {
    apy = apy.div(totalValue)
  }

  const dailyApy = apy.div(365)

  return (
    <Card heading='APR' value={`${apy.times(new BigNumber(100)).toFormat(2)}%`} secondaryValue={`${dailyApy.times(100).toFormat(2)}% Daily`} />
  )
}

export default APRCard