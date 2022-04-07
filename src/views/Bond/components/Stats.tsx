import BigNumber from 'bignumber.js'
import React from 'react'
import { Treasury } from 'state/types'
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
interface Props {
  treasury: Treasury
}

const Stats: React.FC<Props> = ({ treasury }) => {
  const { tombPrice, twap } = treasury

  const twapFormatted = new BigNumber(twap).div(1e18).toFormat(4)
  const tombPriceFormatted = new BigNumber(tombPrice).div(1e18).toFormat(4)
  return (
    <StatsContainer>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>RAV = {twapFormatted} ADA</Text>
        <Text color='#9D9D9D' fontSize='14px'>Last Hour TWAP Price</Text>
      </Col>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>RBOND = {tombPriceFormatted} ADA</Text>
        <Text color='#9D9D9D' fontSize='14px'>Current Price: (RAV)^2</Text>
      </Col>
    </StatsContainer>
  )
}

export default Stats