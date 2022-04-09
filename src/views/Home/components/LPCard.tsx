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
  box-shadow: 0 8px 10px -4px #000;
  width: 30em;
  height: 13.3em;
  padding: 1em;
  border-radius: 0.5em;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  padding: 8px;
  justify-content: space-between;
`

const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Image = styled.img`
  max-width: 128px;
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
        <Text color='#9D9D9D' fontSize='32px' bold>{lpName.toUpperCase()} LP</Text>
        <Col2>
          <Text color='#9D9D9D' fontSize='16px'><b>Liquidity: </b>${marketCap.div(1e18).toFormat(2)}</Text>
          <Text color='#9D9D9D' fontSize='16px'><b>Total Supply: </b>{totalSupply?.div(1e18).toFormat(0)}</Text>
          <Text color='#9D9D9D' fontSize='16px'><b>Price: </b>${new BigNumber(LPPriceUSD).toFormat(2)}</Text>
        </Col2>
      </Col>
      <Col>
        <Image src={lpImage} />
        <a href={`https://spookyswap.finance/add/ETH/${lpName === 'rav-ada' ? getRavAddress() : getRshareAddress()}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Button size='sm'>ZAP IN</Button>
        </a>
      </Col>
    </Card>
  )
}

export default LPCard