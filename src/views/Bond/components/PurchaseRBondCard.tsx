import React from 'react'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import HexCardShadow from './HexCard'

const Image = styled.img`
  max-width: 264px;
`

const PurchaseRBondCard = () => {
  return (
    <HexCardShadow>
      <Text color='#888888' fontSize='20px' bold>Purchase RBOND</Text>
      <Image src="images/icons/purchaseRbond.png" />
      <Text color='#9D9D9D' fontSize='14px' style={{ textAlign: 'center' }}>7791712.5403 RBOND available for purchase</Text>
      <Button size='sm'>APPROVE RAV</Button>
    </HexCardShadow>
  )
}

export default PurchaseRBondCard