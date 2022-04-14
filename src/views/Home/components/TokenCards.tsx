import BigNumber from 'bignumber.js'
import { useBurnedBalanceRav, useBurnedBalanceRbond, useBurnedBalanceRshare, useTotalSupplyRav, useTotalSupplyRbond, useTotalSupplyRshare } from 'hooks/useTokenBalance'
import React from 'react'
import { usePriceRavBusd, usePriceRshareBusd, usePriceRbondBusd, usePriceBnbBusd } from 'state/hooks'
import { getRavAddress, getRshareAddress, getRbondAddress } from 'utils/addressHelpers'
import styled from 'styled-components'
import HexCard from './HexCard'

const Cards = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 80%;

  @media (max-width: 1080px) {
    flex-direction: column;
    width: 80%;
  }
`

const TokenCards = () => {
  const totalSupplyRav = useTotalSupplyRav()
  const totalSupplyRshare = useTotalSupplyRshare()
  const totalSupplyRbond = useTotalSupplyRbond()

  const burnedBalanceRav = useBurnedBalanceRav()
  const burnedBalanceRshare = useBurnedBalanceRshare()
  const burnedBalanceRbond = useBurnedBalanceRbond()

  const ravPriceUsd = usePriceRavBusd()
  const rsharePriceUsd = usePriceRshareBusd()
  const rbondPriceUsd = usePriceRbondBusd()

  const adaPrice = usePriceBnbBusd()

  const circSupplyRav = totalSupplyRav ? totalSupplyRav.minus(burnedBalanceRav) : new BigNumber(0)
  const circSupplyRshare = totalSupplyRshare ? totalSupplyRshare.minus(burnedBalanceRshare) : new BigNumber(0)
  const circSupplyRbond = totalSupplyRbond ? totalSupplyRbond.minus(burnedBalanceRbond) : new BigNumber(0)

  const marketCapRav = ravPriceUsd.times(circSupplyRav)
  const marketCapRshare = rsharePriceUsd.times(circSupplyRshare)
  const marketCapRbond = rbondPriceUsd.times(circSupplyRbond)

  const ravAddress = getRavAddress()
  const rshareAddress = getRshareAddress()
  const rbondAddress = getRbondAddress()

  return (
    <Cards>
      <HexCard tokenAddress={ravAddress} tokenName='rav' tokenPriceUSD={ravPriceUsd} adaPrice={adaPrice} totalSupply={totalSupplyRav} circSupply={circSupplyRav} marketCap={marketCapRav} />
      <HexCard tokenAddress={rshareAddress} tokenName='rshare' tokenPriceUSD={rsharePriceUsd} adaPrice={adaPrice} totalSupply={totalSupplyRshare} circSupply={circSupplyRshare} marketCap={marketCapRshare} />
      <HexCard tokenAddress={rbondAddress} tokenName='rbond' tokenPriceUSD={rbondPriceUsd} adaPrice={adaPrice} totalSupply={totalSupplyRbond} circSupply={circSupplyRbond} marketCap={marketCapRbond} />
    </Cards>
  )
}

export default TokenCards