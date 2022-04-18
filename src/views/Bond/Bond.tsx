import React from 'react'
import styled from 'styled-components'
import WidePage from 'components/layout/WidePage'
import BlueBack from 'views/Home/components/BlueBack'
import BlackBack from 'views/Home/components/BlackBack'
import { Text, useMatchBreakpoints } from 'uikit'
import PurchaseRBondCard from './components/PurchaseRBondCard'
import Stats from './components/Stats'
import RedeemRavCard from './components/RedeemRavCard'
import { useTreasury } from 'state/hooks'
import { Footer } from 'components/Footer'
import BondGraphic from './components/BondGraphic'

const ImageContainer = styled.div`
  position: fixed;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: -99;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1080px) {
    margin-top: 13vh;
  }
`

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 4%;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

const Bond = () => {
  const treasury = useTreasury()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  return (
    <>
      <WidePage style={{ paddingBottom: '1vh', minHeight: '0' }}>
        {!isMobile && <ImageContainer>
          <BlueBack />
          <BlackBack />
        </ImageContainer>}
        <TextContainer>
          <Text color='#003E78' fontSize='40px' bold>BUY {'&'} REDEEM BONDS</Text>
          <Text color='#4E4E4E' fontSize='24px' bold mt='8px'>Earn premiums upon redemption</Text>
        </TextContainer>
        <InfoContainer>
          <PurchaseRBondCard treasury={treasury} />
          <Stats treasury={treasury} />
          <RedeemRavCard treasury={treasury} />
        </InfoContainer>
      </WidePage>
      {!isMobile && <BondGraphic />}
      {!isMobile && <Footer style={{ marginTop: '33px' }} />}
    </>
  )
}

export default Bond