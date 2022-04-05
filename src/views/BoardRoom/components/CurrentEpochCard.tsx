import BigNumber from 'bignumber.js'
import React from 'react'
import { useMasonry } from 'state/hooks'
import Card from './Card'

interface CardProps {
  epoch: string
}

const CurrentEpochCard: React.FC<CardProps> = ({ epoch }) => {
  return (
    <Card heading='CURRENT EPOCH' value={new BigNumber(epoch).toFormat(0)} />
  )
}

export default CurrentEpochCard