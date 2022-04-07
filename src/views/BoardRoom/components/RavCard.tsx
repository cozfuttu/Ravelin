import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import { usePriceRavBusd } from 'state/hooks'
import { useHarvestMasonry } from 'hooks/useHarvest'
import { Masonry } from 'state/types'
import styled from 'styled-components'
import { Button, Text } from 'uikit'
import HexCard from '../../components/HexCard'

const Image = styled.img`
  max-width: 64px;
`

interface CardProps {
  masonry: Masonry
}

const RavCard: React.FC<CardProps> = ({ masonry }) => {
  const { userData } = masonry

  const ravPriceUsd = usePriceRavBusd()
  const { onReward } = useHarvestMasonry()

  const canClaimReward = userData?.canClaimReward
  const [pending, setPending] = useState(false)

  console.log('masonry: ', masonry)
  const rewardEarned = new BigNumber(userData?.earned).div(1e18)
  const rewardEarnedUsd = rewardEarned.times(ravPriceUsd)

  const handleClaimReward = async () => {
    setPending(true)
    try {
      await onReward()
    }
    finally {
      setPending(false)
    }
  }

  return (
    <HexCard>
      <Image src="images/icons/rav.png" />
      <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{rewardEarned.toFormat(4)}</Text>
      <Text color='#9D9D9D' fontSize='14px'>≈ ${rewardEarnedUsd.toFormat(4)}</Text>
      <Text color='#9D9D9D' fontSize='14px'>RAV Earned</Text>
      <Button size='sm' disabled={!canClaimReward || pending} onClick={handleClaimReward} mt="16px">CLAIM REWARD</Button>
    </HexCard>
  )
}

export default RavCard