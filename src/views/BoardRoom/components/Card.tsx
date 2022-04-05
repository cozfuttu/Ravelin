import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'

const InfoCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: #F2F2F2;
  border-radius: 8px;
  box-shadow: 0 8px 10px -4px #000;
  max-width: 17%;
`

interface CardProps {
  heading: string
  value: string
  secondaryValue?: string
}

const Card: React.FC<CardProps> = ({ heading, value, secondaryValue }) => {
  return (
    <InfoCard>
      <Text color='#9D9D9D' fontSize='25px' bold>{heading.toUpperCase()}</Text>
      <Text color='#4E4E4E' fontSize='18px'>{value}</Text>
      {secondaryValue ? <Text color='#9D9D9D' fontSize='14px'>{secondaryValue}</Text> : null}
    </InfoCard>
  )
}

export default Card