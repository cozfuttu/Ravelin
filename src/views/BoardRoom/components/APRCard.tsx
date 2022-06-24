import BigNumber from 'bignumber.js'
import { useBurnedBalanceRav, useTotalSupplyRav, useTotalSupplyRbond } from 'hooks/useTokenBalance'
import React from 'react'
import { usePriceBnbBusd, usePriceRavBusd } from 'state/hooks'
import { Masonry } from 'state/types'
import Card from './Card'

interface CardProps {
  masonry: Masonry
  reserve: string
  twap: string
}

const EXPANSION_BREAKPOINTS = [200000, 400000, 600000, 1000000, 2000000, 5000000]
const EPOCH_AMOUNT_IN_YEAR = 365 * 24 / 6 // 1 year * 24 hours / epoch period

const APRCard: React.FC<CardProps> = ({ masonry, reserve, twap }) => {
  //  const tombPrice = new BigNumber(masonry.tombPrice)

  const cakeTotalSupply = useTotalSupplyRav()
  const rbondTotalSupply = useTotalSupplyRbond()
  const cakeBurnedSupply = useBurnedBalanceRav()
  const ravPrice = usePriceRavBusd()
  const adaPrice = usePriceBnbBusd()

  const circSupplyRav = cakeTotalSupply ? cakeTotalSupply.minus(cakeBurnedSupply).div(1e18).toNumber() : 0
  const modifier = rbondTotalSupply?.isGreaterThan(reserve) ? 0.35 : 1
  const isAbovePeg = new BigNumber(twap).div(1e18).isGreaterThan(1.01)

  let expansionRate: number;
  if (circSupplyRav < EXPANSION_BREAKPOINTS[0]) expansionRate = 0.045
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[1]) expansionRate = 0.04
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[2]) expansionRate = 0.035
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[3]) expansionRate = 0.03
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[4]) expansionRate = 0.02
  else if (circSupplyRav < EXPANSION_BREAKPOINTS[5]) expansionRate = 0.015
  else expansionRate = 0.01

  const ravRewardPerEpoch = circSupplyRav * expansionRate
  const ravRewardPerYear = ravRewardPerEpoch * EPOCH_AMOUNT_IN_YEAR

  const totalValue = new BigNumber(masonry.lpTotalInQuoteToken || 0).times(adaPrice)

  let apy = ravPrice.times(ravRewardPerYear)

  if (totalValue.comparedTo(0) > 0) {
    apy = apy.div(totalValue).times(modifier)
  }

  const dailyApy = apy.div(365)

  return (
    <Card heading='APR' value={`${apy.times(new BigNumber(100)).toFormat(2)}%`} secondaryValue={isAbovePeg ? `${dailyApy.times(100).toFormat(2)}% Daily` : "Active when TWAP >1.01"} />
  )
}

export default APRCard