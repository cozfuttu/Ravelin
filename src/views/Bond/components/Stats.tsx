import BigNumber from 'bignumber.js'
import useCurrentTime from 'hooks/useTimer'
import { DateTime } from 'luxon'
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
  const { previousEpochTombPrice, bondPremiumRate, nextEpochPoint } = treasury
  //  const rbondPriceFormatted = rbondPrice.div(adaPrice).toFormat(2)

  const modifier = new BigNumber(bondPremiumRate).isGreaterThan(1e18)
    ? new BigNumber(bondPremiumRate).div(1e18)
    : new BigNumber(1);

  const previousPriceFormatted = new BigNumber(previousEpochTombPrice).div(1e18).toFormat(2, BigNumber.ROUND_FLOOR)

  const rbondVsRavPrice = new BigNumber(1).times(modifier)

  const currentTimeMillis = useCurrentTime()

  const lNow = DateTime.fromMillis(currentTimeMillis).setZone('utc')
  const lTarget = DateTime.fromMillis(parseInt(nextEpochPoint) * 1000).setZone('utc')
  const timeDiff = lTarget.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')
  return (
    <StatsContainer>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>RAV = {previousPriceFormatted} ADA</Text>
        <Text color='#9D9D9D' fontSize='14px'>Last Epoch TWAP</Text>
      </Col>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>RBOND = {rbondVsRavPrice.toFormat(2)} RAV</Text>
        <Text color='#9D9D9D' fontSize='14px'>Current Price: (RAV)^2</Text>
        <Text color='#9D9D9D' fontSize='14px'>Bonus when RAV Last Epoch TWAP {'>'} 1.1</Text>
      </Col>
      <Col>
        <Text color='#4E4E4E' fontSize='20px' bold>NEXT EPOCH</Text>
        <Text color='#9D9D9D' fontSize='22px'>{timeDiff.toMillis() < 0 ? '00:00:00' : timeDiff.toFormat("hh:mm:ss")}</Text>
      </Col>
    </StatsContainer>
  )
}

export default Stats