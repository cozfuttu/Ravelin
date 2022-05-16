import React from 'react'
import styled from 'styled-components'
import WidePage from 'components/layout/WidePage'
import { Text, useMatchBreakpoints } from 'uikit'
import BondGraphic from 'views/Bond/components/BondGraphic'

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1080px) {
    margin-top: 13vh;
  }
`

const Missions = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  return (
    <WidePage>
      <TextContainer>
        <Text color='#003E78' fontSize='40px' bold>TAKE PART IN MISSIONS</Text>
        <Text color='#4E4E4E' fontSize='24px' bold mt='8px'>Earn RAV by sending your hunter to missions!</Text>
      </TextContainer>
      {!isMobile && <BondGraphic />}
    </WidePage>
  )
}

export default Missions