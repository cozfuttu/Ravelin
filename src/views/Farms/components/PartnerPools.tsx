import React from 'react'
import styled from 'styled-components'
import { Heading, Link, Text } from 'uikit'
import InterstellarCard, { InterstellarWithStakedValue } from './InterstellarCard'

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0;
  background-color: #E6E6E6;
  border-radius: 8px;
  min-height: 250px;
  min-width: 250px;
  position: relative;

  @media (max-width: 1080px) {
    padding: 1rem;
    margin: 0;
  }
`

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`

interface CardsProps {
  interstellarsToDisplayWithApy: InterstellarWithStakedValue[]
  isMobile: boolean
}

const PartnerPools: React.FC<CardsProps> = ({ interstellarsToDisplayWithApy, isMobile }) => {

  const FarmCards = interstellarsToDisplayWithApy.map((interstellar) =>
    <InterstellarCard
      key={interstellar.contractAddress}
      interstellar={interstellar}
      isMobile={isMobile}
    />
  )

  return (
    <Background>
      <Link href="https://adapools.org/pool/b42ea10739065e30e388d4781a7f5a446c3a31343c87dcf26750f83d" style={{ fontSize: '48px', color: "#000", marginBottom: '24px' }}><img src="images/icons/trustpool.webp" width={125} alt="TRUST Pool" />TRUST POOL </Link>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Powered by Cardano, TRUST is the official pool of TRUST fi. Our future mission is to bring value by providing more liquidity to the Cardano and Milkomeda blockchain.</Text>
      <Text color='#000' fontSize='16px' mb="32px" mt={isMobile ? '8px' : "-16px"} style={{ textAlign: 'center', padding: !isMobile && '0 64px' }} >Starting from epoch 350, ADA delegators will receive RAV airdrops.</Text>
      <Text color='#000' fontSize='16px' mb="16px" mt={isMobile ? '8px' : "-16px"} style={{ display: 'flex', alignItems: 'center', gap: '32px', textAlign: 'center' }} >The mADA rewards from the pool below are provided by TRUST Pool.</Text>
      <Cards>
        {FarmCards.filter((card) => card.props.interstellar.partnerName === "TRUST Pool")}
      </Cards>
    </Background>
  )
}

export default PartnerPools