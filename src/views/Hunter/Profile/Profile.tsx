import React from 'react'
import styled from 'styled-components'
import WidePage from 'components/layout/WidePage'
import { Text, useMatchBreakpoints } from 'uikit'
import BondGraphic from 'views/Bond/components/BondGraphic'
import HunterCard from './components/HunterCard'
import ProfileCard from './components/ProfileCard'

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1080px) {
    margin-top: 13vh;
  }
`

const Cards = styled.div`
  display: flex;
  gap: 32px;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

const BackgroundImg = styled.img`
  width: 1920px;
  z-index: -1;
  top: 0;
  position: fixed;
`

const Profile = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  return (
    <>
      <BackgroundImg src="images/hunter/PGHBG.webp" alt="Hunter Background" />
      <WidePage>
        <TextContainer>
          <Text color='#003E78' fontSize='40px' bold>YOUR PROFILE</Text>
          <Text color='#4E4E4E' fontSize='24px' bold mt='8px'>Check your statistics and race with other players!</Text>
        </TextContainer>
        <Cards>
          <HunterCard />
          <ProfileCard />
        </Cards>
        {!isMobile && <BondGraphic />}
      </WidePage>
    </>
  )
}

export default Profile