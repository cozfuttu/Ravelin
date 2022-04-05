import React from 'react'
import WidePage from 'components/layout/WidePage'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import BlueBack from 'views/Home/components/BlueBack'
import BlackBack from 'views/Home/components/BlackBack'
import NextEpochCard from './components/NextEpochCard'
import CurrentEpochCard from './components/CurrentEpochCard'
import APRCard from './components/APRCard'
import RavPriceCard from './components/RavPriceCard'
import TotalStakedCard from './components/TotalStakedCard'
import { useMasonry } from 'state/hooks'
import AttentionIcon from 'views/Home/components/AttentionIcon'
import RavCard from './components/RavCard'
import RshareCard from './components/RshareCard'

const ImageContainer = styled.div`
  position: fixed;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`

const InfoCards = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`

const TokenCards = styled.div`
  display: flex;
  align-items: center;
  margin: 2em auto;
  justify-content: center;
  width: 80%;
`

const ButtonCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BoardRoom = () => {
  const masonry = useMasonry()

  return (
    <WidePage>
      <ImageContainer>
        <BlueBack />
        <BlackBack />
      </ImageContainer>
      <Text color='#003E78' fontSize='32px' bold>BOARDROOM</Text>
      <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn RAV by staking RSHARE</Text>
      <InfoCards>
        <NextEpochCard nextEpochPoint={parseInt(masonry?.nextEpochPoint)} />
        <CurrentEpochCard epoch={masonry?.epoch} />
        <RavPriceCard />
        <APRCard masonry={masonry} />
        <TotalStakedCard />
      </InfoCards>
      <Text color='#000000' fontSize='16px' mt='5%' style={{ textAlign: 'center' }}><span><AttentionIcon /></span>Staked RSHAREs can only be withdrawn after 6 epochs.</Text>
      <TokenCards>
        <RavCard />
        <RshareCard />
      </TokenCards>
      <ButtonCont>
        <Button size='md' disabled>CLAIM AND WITHDRAW</Button>
      </ButtonCont>
    </WidePage>
  )
}

export default BoardRoom