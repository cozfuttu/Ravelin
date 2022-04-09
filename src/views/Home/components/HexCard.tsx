import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #F2F2F2;
  position: relative;
  margin: 1em auto;
  width: 12em; height: 20.784em;
  border-radius: 1.2em/.6em;

  :before, :after {
    position: absolute;
    width: inherit; height: inherit;
    border-radius: inherit;
    background: inherit;
    content: '';
    z-index: -1;
  }
  :before {
    transform: rotate(60deg);
  }
  :after {
    transform: rotate(-60deg);
  }
`

const MetamaskButton = styled.button`
  padding: 4px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Image = styled.img`
  max-width: 64px;
`

interface CardProps {
  tokenAddress: string
  tokenName: string
  tokenPriceUSD: BigNumber
  adaPrice: BigNumber
  marketCap: BigNumber
  circSupply: BigNumber
  totalSupply: BigNumber
}

const HexCard: React.FC<CardProps> = ({ tokenAddress, tokenName, tokenPriceUSD, adaPrice, marketCap, circSupply, totalSupply }) => {
  const tokenImage = `images/icons/${tokenName}.png`
  const tokenPriceInAda = tokenPriceUSD.div(adaPrice)

  const tokenImageMetamask = `https://beta.vanguardian.xyz/images/icons/${tokenName}.png`

  const onMetamaskButtonClick = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenName.toUpperCase(), // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image: tokenImageMetamask, // A string url of the token logo
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card>
      <MetamaskButton onClick={onMetamaskButtonClick}>
        <b>+&nbsp;&nbsp;</b>
        <Image src="images/icons/metamask-fox.svg" style={{ maxWidth: '40px' }} />
      </MetamaskButton>
      <Text color='#9D9D9D' fontSize='22px' bold>{tokenName.toUpperCase()}</Text>
      <Image src={tokenImage} />
      <Text color='#9D9D9D' fontSize='10px'>Current Price</Text>
      <Text color='#007ABE'>{tokenPriceInAda.toFixed(4)} ADA</Text>
      <Text color='#9D9D9D' fontSize='11px'>${tokenPriceUSD.toFormat(4)}</Text>
      <Text color='#9D9D9D' fontSize='11px'><b>Market Cap:</b> ${marketCap.div(1e18).toFormat(2)}</Text>
      <Text color='#9D9D9D' fontSize='11px'><b>Circulating Supply:</b> {circSupply.div(1e18).toFormat(0)}</Text>
      <Text color='#9D9D9D' fontSize='11px'><b>Total Supply:</b> {totalSupply?.div(1e18).toFormat(0)}</Text>
    </Card>
  )
}

export default HexCard