import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR } from 'config'
import { QuoteToken } from 'config/constants/types'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useFarms, usePriceBnbBusd, usePriceRavBusd, usePriceRshareBusd } from 'state/hooks'
import styled from 'styled-components'
import LPCard, { FarmWithStakedValue } from './LPCard'

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 2em;
`

interface CardsProps {
  farmsToDisplayWithApy: FarmWithStakedValue[]
  rsharePrice: BigNumber
  nativePrice: BigNumber
  account: string
  ethereum: any
}

const LPCards: React.FC<CardsProps> = ({ farmsToDisplayWithApy, rsharePrice, nativePrice, account, ethereum }) => {

  const FarmCards = farmsToDisplayWithApy.map((farm, index) => {
    if (index < 2) return (
      <LPCard
        key={farm.pid}
        earnLabel='rshare'
        farm={farm}
        nativePrice={nativePrice}
        rsharePrice={rsharePrice}
        ethereum={ethereum}
        account={account}
      />
    )
  })

  return (
    <Cards>
      {FarmCards}
    </Cards>
  )
}

export default LPCards