import React from 'react'
import styled from 'styled-components'
import WidePage from 'components/layout/WidePage'
import BlueBack from 'views/Home/components/BlueBack'
import BlackBack from 'views/Home/components/BlackBack'
import { Text } from 'uikit'
import PurchaseRBondCard from './components/PurchaseRBondCard'
import Stats from './components/Stats'
import RedeemRavCard from './components/RedeemRavCard'

const ImageContainer = styled.div`
  position: fixed;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 4%;
`

const Bond = () => {
  return (
    <WidePage>
      <ImageContainer>
        <BlueBack />
        <BlackBack />
      </ImageContainer>
      <TextContainer>
        <Text color='#003E78' fontSize='40px' bold>BUY {'&'} REDEEM BONDS</Text>
        <Text color='#4E4E4E' fontSize='24px' bold mt='8px'>Earn premiums upon redemption</Text>
      </TextContainer>
      <InfoContainer>
        <PurchaseRBondCard />
        <Stats />
        <RedeemRavCard />
      </InfoContainer>
    </WidePage>
  )
}

export default Bond