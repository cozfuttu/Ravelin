import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'
import { FarmWithStakedValue } from './LPCard'
import { InterstellarWithStakedValue } from './InterstellarCard'

const Cards = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 66%;
  margin-top: 2em;
  gap: 8px;

  @media (max-width: 1080px) {
    flex-wrap: wrap;
    width: 80%;
    margin-top: 0;
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
  box-shadow: 0 6px 10px -4px #646464;
  max-width: 25%;

  @media (max-width: 1080px) {
    border-radius: 24px;
    max-width: 100%;
    min-width: 40%;
    padding: 0.5rem 0.25rem;
    border-radius: 4px;
  }
`

const TextAntonio = styled.div`
  font-family: 'Antonio', sans-serif;
  color: #9D9D9D;
  font-weight: 700;
  font-size: 24px;
  border-bottom: 2px solid #DADADA;
`

interface Props {
  farm?: FarmWithStakedValue
  interstellar?: InterstellarWithStakedValue
  tvl: string
  dailyApr: string
  isMobile: boolean
}

const StatisticCards: React.FC<Props> = ({ farm, interstellar, tvl, dailyApr, isMobile }) => {
  const isFarmFinished = farm?.poolEndTime * 1000 <= Date.now()
  const farmApy = farm ? !isFarmFinished ? farm?.apy?.times(new BigNumber(100)).toNumber() : 0 : interstellar?.apy?.times(new BigNumber(100)).toNumber()

  const farmApyString = new BigNumber(farmApy).toFormat(0)

  return (
    <Cards>
      <InfoCard>
        <TextAntonio>APR</TextAntonio>
        <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word' }}>%{farmApyString}</Text>
      </InfoCard>
      <InfoCard>
        <TextAntonio>DAILY APR</TextAntonio>
        <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word' }}>%{dailyApr}</Text>
      </InfoCard>
      <InfoCard style={{ width: isMobile && '100%' }}>
        <TextAntonio>TVL</TextAntonio>
        <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word' }}>{tvl}</Text>
      </InfoCard>
    </Cards>
  )
}

export default StatisticCards