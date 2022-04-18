import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import { getRavAddress, getRshareAddress } from 'utils/addressHelpers'

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F2F2F2;
  box-shadow: 0 6px 10px -4px #646464;
  width: 500px;
  height: 205px;
  padding: 1em;
  border-radius: 0.5em;

  @media (max-width: 1080px) {
    width: 90%;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 90%;
  padding: 8px;
  justify-content: space-between;

  
  @media (max-width: 1080px) {
    align-items: flex-start;
  }
`

const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Image = styled.img`
  max-width: 138px;

  @media (max-width: 1080px) {
    max-width: 96px;
  }
`

const TextAntonio = styled.div`
  font-family: 'Antonio', sans-serif;
  color: #9D9D9D;
  font-weight: 700;
  font-size: 36px;
`

interface CardProps {
  lpName: string
  LPPriceUSD: number
  adaPrice: BigNumber
  marketCap: BigNumber
  totalSupply: BigNumber
}

const LPCard: React.FC<CardProps> = ({ lpName, LPPriceUSD, adaPrice, marketCap, totalSupply }) => {
  const lpImage = `images/icons/${lpName}.png`
  // const lpPriceInAda = LPPriceUSD.div(adaPrice)
  return (
    <Card>
      <Col>
        <TextAntonio>{lpName.toUpperCase()} LP</TextAntonio>
        <Col2>
          <Text color='#9D9D9D' fontSize='16px'><b>Liquidity: </b>${/* marketCap.div(1e18).toFormat(2) */ 0.00}</Text>
          <Text color='#9D9D9D' fontSize='16px'><b>Total Supply: </b>{/* totalSupply?.div(1e18).toFormat(0) */ 0.00}</Text>
          <Text color='#9D9D9D' fontSize='16px'><b>Price: </b>${/* new BigNumber(LPPriceUSD).toFormat(2) */ 0.00}</Text>
        </Col2>
      </Col>
      <Col style={{ alignItems: 'center' }}>
        <Image src={lpImage} />
        <a href={/* `https://www.milkyswap.exchange/add/ETH/${lpName === 'rav-ada' ? getRavAddress() : getRshareAddress()}` */ '/'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Button size='sm'>ZAP IN</Button>
        </a>
      </Col>
    </Card>
  )
}

export default LPCard