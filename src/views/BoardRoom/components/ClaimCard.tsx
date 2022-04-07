import BigNumber from 'bignumber.js'
import useCurrentTime from 'hooks/useTimer'
import { DateTime } from 'luxon'
import React from 'react'
import { Masonry } from 'state/types'
import Card from './Card'

interface Props {
  masonry: Masonry
  period: string
}

const ClaimCard: React.FC<Props> = ({ masonry, period }) => {
  const { userData, rewardLockupEpochs, epoch, nextEpochPoint } = masonry

  const currentTimeMilis = useCurrentTime()

  const lNow = DateTime.fromMillis(currentTimeMilis).setZone('utc')
  const targetTimeMilis = new BigNumber(userData?.epochTimerStart).plus(new BigNumber(rewardLockupEpochs)).minus(new BigNumber(epoch)).minus(1).times(new BigNumber(period)).plus(new BigNumber(nextEpochPoint)).times(1000)
  const claimTimeLeft = DateTime.fromMillis(targetTimeMilis.toNumber()).setZone('utc')
  const timeDiffWith = claimTimeLeft.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')
  return (
    <Card heading='Claim possible in' value={timeDiffWith.toFormat("dd:hh:mm:ss")} style={{ maxWidth: '30%', padding: '48px 32px' }} />
  )
}

export default ClaimCard