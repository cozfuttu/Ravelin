import React from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import HexCardShadow from './HexCard'

const Image = styled.img`
  max-width: 264px;
`

const RedeemRavCard = () => {
  return (
    <HexCardShadow>
      <Text color='#888888' fontSize='20px' bold>Redeem RAV</Text>
      <Image src="images/icons/redeemRav.png" />
      <Text color='#9D9D9D' fontSize='14px' style={{ textAlign: 'center' }}>0.0000 RBOND Available in wallet</Text>
      <Button size='sm' disabled>ENABLED WHEN RAV {'>'} 1.01 ADA</Button>
    </HexCardShadow>
  )
}

export default RedeemRavCard