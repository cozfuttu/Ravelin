import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import InterstellarCard, { InterstellarWithStakedValue } from './InterstellarCard'

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 2em;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

interface CardsProps {
  interstellarsToDisplayWithApy: InterstellarWithStakedValue[]
  rsharePrice: BigNumber
  nativePrice: BigNumber
  account: string
  ethereum: any
  isMobile?: boolean
}

const InterstellarCards: React.FC<CardsProps> = ({ interstellarsToDisplayWithApy, rsharePrice, nativePrice, account, ethereum, isMobile }) => {

  const ICards = interstellarsToDisplayWithApy.map((interstellar) =>
    <InterstellarCard
      key={interstellar.contractAddress}
      earnLabel={'rav'}
      interstellar={interstellar}
      nativePrice={nativePrice}
      rsharePrice={rsharePrice}
      ethereum={ethereum}
      account={account}
      isMobile={isMobile}
    />
  )

  return (
    <Cards>
      {ICards}
    </Cards>
  )
}

export default InterstellarCards