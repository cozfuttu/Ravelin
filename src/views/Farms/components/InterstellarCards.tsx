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
  isMobile?: boolean
}

const InterstellarCards: React.FC<CardsProps> = ({ interstellarsToDisplayWithApy, isMobile }) => {

  const ICards = interstellarsToDisplayWithApy.map((interstellar, index) =>
    <InterstellarCard
      key={interstellar.contractAddress}
      interstellar={interstellar}
      index={index}
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