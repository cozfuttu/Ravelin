import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'

const InfoCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F2F2F2;
  border-radius: 8px;
  box-shadow: 0 6px 10px -4px #646464;
  max-width: 17%;
  text-align: center;
  z-index: 1;
  min-width: 120px;
  
  @media (max-width: 1080px) {
    padding: 8px;
  }
`

const TextAntonio = styled.div`
  font-family: 'Antonio', sans-serif;
  color: #9D9D9D;
  font-weight: 700;
  font-size: 24px;
  border-bottom: 2px solid #DADADA;
`

interface CardProps {
  heading: string
  value: any
  secondaryValue?: string
  style?: any
}

const Card: React.FC<CardProps> = ({ heading, value, secondaryValue, style }) => {
  return (
    <InfoCard style={style}>
      <TextAntonio>{heading.toUpperCase()}</TextAntonio>
      <Text color='#4E4E4E' fontSize='18px' style={{ wordBreak: 'break-word', maxWidth: '100%' }}>{value}</Text>
      {secondaryValue ? <Text color='#9D9D9D' fontSize='14px'>{secondaryValue}</Text> : null}
    </InfoCard>
  )
}

export default Card