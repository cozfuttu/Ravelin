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
  text-align: center;
  position: relative;
  margin: 2em 6em;
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

  @media (max-width: 1080px) {
    width: 11em; height: 19.05em;
    border-radius: 1.1em/.55em;
    margin: 2em auto;
  } 
`

const MetamaskButton = styled.button`
  padding: 4px;
  border: 2px solid #DADADA;
  border-radius: 6px;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Image = styled.img`
  max-width: 64px;
`

const TextAntonio = styled.div`
  font-family: 'Antonio', sans-serif;
  color: #9D9D9D;
  font-weight: 700;
  font-size: 32px;
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
  const tokenPriceInAda = tokenPriceUSD.div(adaPrice).isNaN() ? new BigNumber(0) : tokenPriceUSD.div(adaPrice)

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
        <Text color='#9D9D9D' fontSize='32px' bold>+&nbsp;</Text>
        <Image src="images/icons/metamask-fox.svg" style={{ maxWidth: '32px' }} />
      </MetamaskButton>
      <TextAntonio>{tokenName.toUpperCase()}</TextAntonio>
      <Image src={tokenImage} />
      <Text color='#9D9D9D' fontSize='10px'>Current Price</Text>
      <Text color='#007ABE'>{tokenPriceInAda.toFormat(4)} ADA</Text>
      <Text color='#9D9D9D' fontSize='11px'>${tokenPriceUSD.toFormat(4)}</Text>
      <Text color='#9D9D9D' fontSize='12px'><b>Market Cap:</b> ${marketCap.div(1e18).toFormat(2)}</Text>
      <Text color='#9D9D9D' fontSize='12px'><b>Circulating Supply:</b> {circSupply.div(1e18).toFormat(0)}</Text>
      <Text color='#9D9D9D' fontSize='12px'><b>Total Supply:</b> {totalSupply?.div(1e18).toFormat(0)}</Text>
    </Card>
  )
}

export default HexCard