import BigNumber from 'bignumber.js'
import React from 'react'
import { usePriceBnbBusd } from 'state/hooks'
import { Masonry } from 'state/types'
import Card from './Card'

interface CardProps {
  masonry: Masonry
}

const APRCard: React.FC<CardProps> = ({ masonry }) => {
  const tombPrice = new BigNumber(masonry.tombPrice)
  const nativePrice = usePriceBnbBusd()

  const cakeRewardPerEpoch = 2597216
  const cakeRewardPerYear = cakeRewardPerEpoch * 1460

  let apy = tombPrice.times(cakeRewardPerYear)

  let totalValue = new BigNumber(masonry.lpTotalInQuoteToken || 0)

  totalValue = totalValue.times(nativePrice)
  /* else if (farm.quoteTokenSymbol === QuoteToken.RAV) {
    totalValue = totalValue.times(ravPrice)
  } */

  if (totalValue.comparedTo(0) > 0) {
    apy = apy.div(totalValue)
  }

  return (
    <Card heading='APR' value={`${apy.times(new BigNumber(100)).toFormat(2)}%`} />
  )
}

export default APRCard