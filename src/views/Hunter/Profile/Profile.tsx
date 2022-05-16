import React from 'react'
import styled from 'styled-components'
import WidePage from 'components/layout/WidePage'
import { Text, useMatchBreakpoints } from 'uikit'
import BondGraphic from 'views/Bond/components/BondGraphic'
import HunterCard from './HunterCard'
import ProfileCard from './ProfileCard'

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

const Profile = () => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false
  return (
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
  )
}

export default Profile