import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import { DateTime } from 'luxon'
import Card from './Card'
import { Button } from 'uikit'
import useAllocateSeigniorage from 'hooks/useAllocateSeignorance'

interface CardProps {
  nextEpochPoint: number
}

const NextEpochCard: React.FC<CardProps> = ({ nextEpochPoint }) => {
  const currentTimeMillis = useCurrentTime()

  const lNow = DateTime.fromMillis(currentTimeMillis).setZone('utc')
  const lTarget = DateTime.fromMillis(nextEpochPoint * 1000).setZone('utc')
  const timeDiff = lTarget.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')

  const { onAllocate } = useAllocateSeigniorage()

  return (
    <Card heading='NEXT EPOCH' value={timeDiff.toMillis() < 0 ? <Button size='sm' onClick={onAllocate} style={{ maxWidth: '100%', padding: '1.5rem 0.5rem' }}>Allocate Rewards</Button> : timeDiff.toFormat("dd:hh:mm:ss")} />
  )
}

export default NextEpochCard