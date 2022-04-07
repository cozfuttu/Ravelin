import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'
import AttentionIcon from 'views/Home/components/AttentionIcon'
import LPCard, { FarmWithStakedValue } from './LPCard'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  background-color: #E6E6E6;
  border-radius: 8px;
`

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`

interface CardsProps {
  farmsToDisplayWithApy: FarmWithStakedValue[]
  rsharePrice: BigNumber
  nativePrice: BigNumber
  account: string
  ethereum: any
}

const Genesis: React.FC<CardsProps> = ({ farmsToDisplayWithApy, rsharePrice, nativePrice, account, ethereum }) => {

  const FarmCards = farmsToDisplayWithApy.map((farm) =>
    <LPCard
      key={farm.pid}
      earnLabel='rav'
      farm={farm}
      nativePrice={nativePrice}
      rsharePrice={rsharePrice}
      ethereum={ethereum}
      account={account}
    />
  )

  return (
    <Background>
      <Text color='#000' fontSize='16px' mb="8px"><span><AttentionIcon /></span>The pools below will end on (date)</Text>
      <Cards>
        {FarmCards}
      </Cards>
    </Background>
  )
}

export default Genesis