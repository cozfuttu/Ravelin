import React from 'react'
import styled from 'styled-components'
import { Card } from 'views/components/HexCard'

const ShadowCard = styled(Card)`
  box-shadow: 0 8px 10px -4px #000;
  gap: 16px;
  width: 15em; height: 25.98em;
  border-radius: 1.5em/.75em;
  
  :before, :after {
    box-shadow: 0 4px 10px -4px #000;
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