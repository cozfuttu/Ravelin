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

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

interface CardsProps {
  farmsToDisplayWithApy: FarmWithStakedValue[]
  rsharePrice: BigNumber
  nativePrice: BigNumber
  account: string
  ethereum: any
  isMobile?: boolean
}

const LPCards: React.FC<CardsProps> = ({ farmsToDisplayWithApy, rsharePrice, nativePrice, account, ethereum, isMobile }) => {

  const FarmCards = farmsToDisplayWithApy.map((farm) =>
    <LPCard
      key={farm.risk}
      earnLabel={(farm.isRavPool || farm.isGenesis) ? 'rav' : 'rshare'}
      farm={farm}
      nativePrice={nativePrice}
      rsharePrice={rsharePrice}
      ethereum={ethereum}
      account={account}
      isMobile={isMobile}
    />
  )

  return (
    <Cards>
      {FarmCards}
    </Cards>
  )
}

export default LPCards