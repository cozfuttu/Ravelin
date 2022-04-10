import BigNumber from 'bignumber.js'
import { useBurnedBalanceRavNativeLP, useBurnedBalanceRshareNativeLP, useTotalSupplyRavNativeLP, useTotalSupplyRshareNativeLP } from 'hooks/useTokenBalance'
import React from 'react'
import { usePriceBnbBusd, usePriceRavNativeLP, usePriceRshareNativeLP } from 'state/hooks'
import styled from 'styled-components'
import LPCard from './LPCard'

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  margin-top: 2em;
  gap: 32px;

  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 24px;
  }
`

const LPCards = () => {
  const totalSupplyRavNativeLP = useTotalSupplyRavNativeLP()
  const totalSupplyRshareNativeLP = useTotalSupplyRshareNativeLP()

  const burnedBalanceRav = useBurnedBalanceRavNativeLP()
  const burnedBalanceRshare = useBurnedBalanceRshareNativeLP()

  const ravLPPriceUsd = usePriceRavNativeLP()
  const rshareLPPriceUsd = usePriceRshareNativeLP()

  const adaPrice = usePriceBnbBusd()

  const circSupplyRavLP = totalSupplyRavNativeLP ? totalSupplyRavNativeLP.minus(burnedBalanceRav) : new BigNumber(0)
  const circSupplyRshareLP = totalSupplyRshareNativeLP ? totalSupplyRshareNativeLP.minus(burnedBalanceRshare) : new BigNumber(0)

  const marketCapRavLP = circSupplyRavLP.times(ravLPPriceUsd)
  const marketCapRshareLP = circSupplyRshareLP.times(rshareLPPriceUsd)

  return (
    <Cards>
      <LPCard lpName='rav-ada' totalSupply={totalSupplyRavNativeLP} adaPrice={adaPrice} LPPriceUSD={ravLPPriceUsd} marketCap={marketCapRavLP} />
      <LPCard lpName='rshare-ada' totalSupply={totalSupplyRshareNativeLP} adaPrice={adaPrice} LPPriceUSD={rshareLPPriceUsd} marketCap={marketCapRshareLP} />
    </Cards>
  )
}

export default LPCards