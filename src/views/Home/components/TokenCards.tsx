import BigNumber from 'bignumber.js'
import { useBurnedBalanceRav, useBurnedBalanceRbond, useBurnedBalanceRshare, useTokenBalanceOfContract, useTotalSupplyRav, useTotalSupplyRbond, useTotalSupplyRshare } from 'hooks/useTokenBalance'
import React, { useMemo } from 'react'
import { usePriceRavBusd, usePriceRshareBusd, usePriceRbondBusd, usePriceBnbBusd } from 'state/hooks'
import { getRavAddress, getRshareAddress, getRbondAddress, getRsharePoolsAddress } from 'utils/addressHelpers'
import styled from 'styled-components'
import HexCard from './HexCard'

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  width: 80%;

  @media (max-width: 1600px) {
    justify-content: center;
  }

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

const TokenCards = () => {
  const ravAddress = useMemo(() => getRavAddress(), [])
  const rshareAddress = useMemo(() => getRshareAddress(), [])
  const rbondAddress = useMemo(() => getRbondAddress(), [])
  const rsharePoolsAddress = useMemo(() => getRsharePoolsAddress(), [])

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

  const rshareAmountInPools = useTokenBalanceOfContract(rshareAddress, rsharePoolsAddress)

  const circSupplyRav = useMemo(() => totalSupplyRav ? totalSupplyRav.minus(burnedBalanceRav) : new BigNumber(0), [totalSupplyRav, burnedBalanceRav])
  const circSupplyRshare = useMemo(() => totalSupplyRshare ? totalSupplyRshare.minus(burnedBalanceRshare).minus(rshareAmountInPools) : new BigNumber(0), [totalSupplyRshare, burnedBalanceRshare, rshareAmountInPools])
  const circSupplyRbond = useMemo(() => totalSupplyRbond ? totalSupplyRbond.minus(burnedBalanceRbond) : new BigNumber(0), [totalSupplyRbond, burnedBalanceRbond])

  const marketCapRav = useMemo(() => ravPriceUsd.times(circSupplyRav), [ravPriceUsd, circSupplyRav])
  const marketCapRshare = useMemo(() => rsharePriceUsd.times(circSupplyRshare), [rsharePriceUsd, circSupplyRshare])
  const marketCapRbond = useMemo(() => rbondPriceUsd.times(circSupplyRbond), [rbondPriceUsd, circSupplyRbond])

  return (
    <Cards>
      <HexCard tokenAddress={ravAddress} tokenName='rav' tokenPriceUSD={ravPriceUsd} adaPrice={adaPrice} totalSupply={totalSupplyRav} circSupply={circSupplyRav} marketCap={marketCapRav} />
      <HexCard tokenAddress={rshareAddress} tokenName='rshare' tokenPriceUSD={rsharePriceUsd} adaPrice={adaPrice} totalSupply={totalSupplyRshare} circSupply={circSupplyRshare} marketCap={marketCapRshare} />
      <HexCard tokenAddress={rbondAddress} tokenName='rbond' tokenPriceUSD={rbondPriceUsd} adaPrice={adaPrice} totalSupply={totalSupplyRbond} circSupply={circSupplyRbond} marketCap={marketCapRbond} />
    </Cards>
  )
}

export default TokenCards