import BigNumber from 'bignumber.js'
import React from 'react'
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

  const FarmCards = farmsToDisplayWithApy.map((farm) =>
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

  return (
    <Cards>
      {FarmCards}
    </Cards>
  )
}

export default LPCards