import React from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import HexCard from '../../components/HexCard'

const Image = styled.img`
  max-width: 64px;
`

const RshareCard = () => {
  return (
    <HexCard>
      <Image src="images/icons/rshare.png" />
      <Text color='#4E4E4E' fontSize='32px' bold mb="8px">0.0000</Text>
      <Text color='#9D9D9D' fontSize='14px'>≈ $0.00</Text>
      <Text color='#9D9D9D' fontSize='14px'>RSHARE Earned</Text>
      <Button size='sm' mt="16px">APPROVE RSHARE</Button>
    </HexCard>
  )
}

export default RshareCard