import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'
import { FarmWithStakedValue } from './LPCard'

const Cards = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  width: 70%;
  margin-top: 2em;

  @media (max-width: 1080px) {
    flex-wrap: wrap;
    width: 80%;
    gap: 8px;
  }
`

const InfoCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #F2F2F2;
  border-radius: 8px;
  box-shadow: 0 6px 6px -4px #000;
  max-width: 25%;

  @media (max-width: 1080px) {
    border-radius: 24px;
    max-width: 100%;
    min-width: 40%;
    padding: 0.5rem 0.25rem;
    border-radius: 4px;
  }
`

interface Props {
  farm: FarmWithStakedValue
  tvl: string
  dailyApr: string
  isMobile: boolean
}

const StatisticCards: React.FC<Props> = ({ farm, tvl, dailyApr, isMobile }) => {
  const isFarmFinished = farm.poolEndTime * 1000 <= Date.now()
  const farmApy = !isFarmFinished ? farm.apy?.times(new BigNumber(100)).toNumber() : 0

  const farmApyString = new BigNumber(farmApy).toFormat(0)

  return (
    <Cards>
      <InfoCard>
        <Text color='#9D9D9D' fontSize='24px' bold style={{ borderBottom: '2px solid #DADADA' }}>APR</Text>
        <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word' }}>%{farmApyString}</Text>
      </InfoCard>
      <InfoCard>
        <Text color='#9D9D9D' fontSize='24px' bold style={{ borderBottom: '2px solid #DADADA' }}>DAILY APR</Text>
        <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word' }}>%{dailyApr}</Text>
      </InfoCard>
      <InfoCard style={{ width: isMobile && '100%' }}>
        <Text color='#9D9D9D' fontSize='24px' bold style={{ borderBottom: '2px solid #DADADA' }}>TVL</Text>
        <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word' }}>{tvl}</Text>
      </InfoCard>
    </Cards>
  )
}

export default StatisticCards