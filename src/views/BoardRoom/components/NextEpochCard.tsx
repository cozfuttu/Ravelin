import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import { DateTime } from 'luxon'
import Card from './Card'

interface CardProps {
  nextEpochPoint: number
}

const NextEpochCard: React.FC<CardProps> = ({ nextEpochPoint }) => {
  const currentTimeMillis = useCurrentTime()

  const lNow = DateTime.fromMillis(currentTimeMillis).setZone('utc')
  const lTarget = DateTime.fromMillis(nextEpochPoint * 1000).setZone('utc')
  const timeDiff = lTarget.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')
  return (
    <Card heading='NEXT EPOCH' value={timeDiff.toMillis() < 0 ? "00:00:00:00" : timeDiff.toFormat("dd:hh:mm:ss")} />
  )
}

export default NextEpochCard