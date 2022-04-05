import React from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import HexCard from '../../components/HexCard'

const Image = styled.img`
  max-width: 64px;
`

const RavCard = () => {
  return (
    <HexCard>
      <Image src="images/icons/rav.png" />
      <Text color='#4E4E4E' fontSize='32px' bold mb="8px">0.0000</Text>
      <Text color='#9D9D9D' fontSize='14px'>≈ $0.00</Text>
      <Text color='#9D9D9D' fontSize='14px'>RAV Earned</Text>
      <Button size='sm' disabled mt="16px">CLAIM REWARD</Button>
    </HexCard>
  )
}

export default RavCard