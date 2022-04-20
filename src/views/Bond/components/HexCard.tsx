import React from 'react'
import styled from 'styled-components'
import { Card } from 'views/components/HexCard'

const ShadowCard = styled(Card)`
  box-shadow: 0 6px 4px -4px #b3b3b3;
  gap: 16px;
  width: 15em; height: 25.98em;
  border-radius: 1.5em/.75em;
  
  :before, :after {
    box-shadow: 0 6px 4px -4px #b3b3b3;
  }

  @media (max-width: 1080px) {
    width: 12.54em; height: 21.717em;
    border-radius: 1.254em/.627em;
    margin: 2em auto;
  } 
`

const HexCardShadow = ({ children }) => {
  return (
    <ShadowCard>
      {children}
    </ShadowCard>
  )
}

export default HexCardShadow