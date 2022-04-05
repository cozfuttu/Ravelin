import React from 'react'
import { usePriceBnbBusd, usePriceRavBusd } from 'state/hooks'
import Card from './Card'

const RavPriceCard = () => {
  const ravPrice = usePriceRavBusd()
  const nativePrice = usePriceBnbBusd()
  const ravPriceInNative = ravPrice.div(nativePrice)
  return (
    <Card heading='RAV PRICE' value={`${ravPriceInNative.toFormat(3)} FTM`} secondaryValue={`$${ravPrice.toFormat(3)}`} />
  )
}

export default RavPriceCard