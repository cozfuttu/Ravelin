import WidePage from 'components/layout/WidePage'
import React from 'react'
import styled from 'styled-components'
import CountUp from 'react-countup';
import { Button, Text, useMatchBreakpoints } from 'uikit'
import BlackBack from './components/BlackBack'
import BlueBack from './components/BlueBack'
import GrayBack from './components/GrayBack'
import AttentionIcon from './components/AttentionIcon'
import TokenCards from './components/TokenCards'
import LPCards from './components/LPCards'
import { useTotalValue } from 'state/hooks'
import { getRavAddress, getRshareAddress } from 'utils/addressHelpers'
import { Footer } from 'components/Footer'
import HomeGraphic from './components/HomeGraphic'

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  margin-left: 200px;
  height: 100%;
  width: 90%;

  @media (max-width: 1080px) {
    margin-left: 0;
    width: 100%;
    top: 0;
  }
`

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 50%;
  margin-top: 3vh;
  margin-left: -9vw;

  @media (max-width: 1080px) {
    width: 90%;
    margin-left: 0;
  }
`

const TVLandButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: flex-end;
  justify-content: center;
  gap: 48px;
  width: 80%;
  margin: 4.5% 0;

  @media (max-width: 1080px) {
    width: 95%;
    gap: 16px;
    margin-top: 32px;
    margin-left: 8px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 96px;
  width: 100%;

  @media (max-width: 1080px) {
    justify-content: space-between;
    gap: 32px;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 1080px) {
    align-self: center;
  }
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

  @media (max-width: 1080px) {
    height: 55vh;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 12px;
  align-items: center;
  align-self: stretch;

  @media (max-width: 1080px) {
    flex-direction: column;
    align-items: stretch;
    margin-right: 5%;
  }
`

const Header = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: #003E78;
`

const Home = () => {
  const totalValue = useTotalValue()
  const { isXl } = useMatchBreakpoints()

  const isMobile = isXl === false

  return (
    <>
      <WidePage >
        <ImageContainer>
          <TextContainer>
            <WelcomeContainer>
              <Header>WELCOME TO RAVELIN FINANCE</Header>
              <Text color="#000" style={{ marginBottom: isMobile && '8vh' }}>The first algorithmic stablecoin on Milkomeda, pegged to the price of 1 ADA via seigniorage.</Text>
              {!isMobile && <Text color="#000" mt='16px' bold>Stake your RAV-ADA LP in the FARM to earn RSHARE rewards. Then stake your earned RSHARE in the BOARDROOM to earn more RAV!</Text>}
            </WelcomeContainer>
            <TVLandButtonsContainer>
              {!isMobile && <Text color="#000000"><span><AttentionIcon /></span>Please visit our <a href="https://ravelin-finance.gitbook.io/ravelin-finance/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#007ABE', fontWeight: '700' }}>documentation</a> before purchasing RAV or RSHARE!</Text>}
              <Row>
                <Col>
                  <Text color="#007ABE" fontSize='18px' bold style={{ fontSize: isMobile && '12px' }}>TOTAL VALUE LOCKED:</Text>
                  <CountUp style={{ fontSize: isMobile ? '22px' : '32px', color: '#007ABE', fontWeight: '700', fontFamily: 'Inter' }} end={totalValue.toNumber()} separator="," prefix="$" />
                </Col>
                <Buttons>
                  <a href="/boardroom" style={{ textDecoration: 'none' }}>
                    <Button padding='28px' style={{ width: isMobile && '100%', fontSize: '14px' }}>STAKE NOW</Button>
                  </a>
                  <a href="/farm" style={{ textDecoration: 'none' }}>
                    <Button padding='28px' style={{ width: isMobile && '100%', fontSize: '14px' }}>FARM NOW</Button>
                  </a>
                  <a href={`https://app.occam-x.fi/swap?outputCurrency=${getRavAddress()}`} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <Button padding='28px' style={{ width: isMobile && '100%', fontSize: '14px' }}>BUY RAV</Button>
                  </a>
                  <a href={`https://app.occam-x.fi/swap?outputCurrency=${getRshareAddress()}`} target='_blank' rel="noreferrer" style={{ textDecoration: 'none' }}>
                    <Button padding='28px' style={{ width: isMobile && '100%', fontSize: '14px' }}>BUY RSHARE</Button>
                  </a>
                </Buttons>
              </Row>
              {isMobile && <Text color="#000000" mt="100px" style={{ textAlign: 'center' }}><span><AttentionIcon /></span>Please visit our <a href="https://www.google.com/" style={{ textDecoration: 'none', color: '#007ABE', fontWeight: '700' }}>documentation</a> before purchasing RAV or RSHARE!</Text>}
            </TVLandButtonsContainer>
            <TokenCards />
            <LPCards />
          </TextContainer>
          {!isMobile && <GrayBack />}
          <BlueBack />
          <BlackBack />
        </ImageContainer>
        {!isMobile && <HomeGraphic />}
      </WidePage>
      {!isMobile && <Footer />}
    </>
  )
}

export default Home