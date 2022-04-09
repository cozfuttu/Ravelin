import BigNumber from 'bignumber.js'
import React from 'react'
import { usePriceBnbBusd } from 'state/hooks'
import Card from './Card'

interface CardProps {
  RavTWAP: string
}

const RavPriceCard: React.FC<CardProps> = ({ RavTWAP }) => {
  const ravPrice = new BigNumber(RavTWAP).div(1e18)
  const nativePrice = usePriceBnbBusd()
  const ravPriceUSD = ravPrice.times(nativePrice)
  return (
    <Card heading='RAV PRICE' value={`${ravPrice.toFormat(4)} FTM`} secondaryValue={`$${ravPriceUSD.toFormat(2)}`} />
  )
}

export default RavPriceCard