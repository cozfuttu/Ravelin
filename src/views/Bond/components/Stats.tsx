import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Stats = () => {
  return (
    <StatsContainer>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>RAV = 0.9626 ADA</Text>
        <Text color='#9D9D9D' fontSize='14px'>Last Hour TWAP Price</Text>
      </Col>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>RBOND = 0.96 ADA</Text>
        <Text color='#9D9D9D' fontSize='14px'>Current Price: (RAV)^2</Text>
      </Col>
    </StatsContainer>
  )
}

export default Stats