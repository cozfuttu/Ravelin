import WidePage from 'components/layout/WidePage'
import React from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import BlackBack from './components/BlackBack'
import BlueBack from './components/BlueBack'
import GrayBack from './components/GrayBack'
import AttentionIcon from './components/AttentionIcon'
import TokenCards from './components/TokenCards'
import LPCards from './components/LPCards'
import { useTotalValue } from 'state/hooks'
import { getRavAddress, getRshareAddress } from 'utils/addressHelpers'

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin-left: 300px;
  height: 100%;
  width: 80%;
`

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 60%;
`

const TVLandButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: center;
  gap: 16px;
  margin: 6% 0;
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  width: 100vw;
  padding-bottom: 4em;
`

const Buttons = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-evenly;
`

const Home = () => {
  const totalValue = useTotalValue()

  return (
    <WidePage>
      <ImageContainer>
        <TextContainer>
          <WelcomeContainer>
            <Text color="#003E78" fontSize='36px' bold>WELCOME TO RAVELIN FINANCE</Text>
            <Text color="#000">The first algorithmic stablecoin on Cardano, pegged to the price of 1 ADA via seigniorage.</Text>
            <Text color="#000" mt='16px' bold>Stake your STEEL-ADA LP in the Cemetery to earn FOUNDATION (FDT) rewards. Then stake your earned FDT in the Masonry to earn more TOMB!</Text>
          </WelcomeContainer>
          <TVLandButtonsContainer>
            <Text color="#000000"><span><AttentionIcon /></span>Please visit our <a href="https://www.google.com/">documentation</a> before purchasing STEEL or FOUNDATION!</Text>
            <Row>
              <Col>
                <Text color="#007ABE" fontSize='18px' bold>TOTAL VALUE LOCKED:</Text>
                <Text color="#007ABE" fontSize='32px' bold style={{ transition: 'all 1s linear' }}>${totalValue.toFormat(2)}</Text>
              </Col>
              <Buttons>
                <a href="/boardroom" style={{ textDecoration: 'none' }}>
                  <Button>STAKE NOW</Button>
                </a>
                <a href="/farms" style={{ textDecoration: 'none' }}>
                  <Button>FARM NOW</Button>
                </a>
                <a href={`https://spookyswap.finance/swap?outputCurrency=${getRavAddress()}`} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <Button>BUY RAV</Button>
                </a>
                <a href={`https://spookyswap.finance/swap?outputCurrency=${getRshareAddress()}`} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                  <Button>BUY RSHARE</Button>
                </a>
              </Buttons>
            </Row>
          </TVLandButtonsContainer>
          <TokenCards />
          <LPCards />
        </TextContainer>
        <GrayBack />
        <BlueBack />
        <BlackBack />
      </ImageContainer>
    </WidePage>
  )
}

export default Home