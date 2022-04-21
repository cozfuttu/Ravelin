import React from 'react'
import Card from './Card'
import { Masonry } from 'state/types'
import BigNumber from 'bignumber.js'

interface Props {
  masonry: Masonry
}

const TotalStakedCard: React.FC<Props> = ({ masonry }) => {
  const stakedBalance = new BigNumber(masonry?.tokenAmount).toFormat(2)
  return (
    <Card heading='RSHARE STAKED' value={stakedBalance} />
  )
}

export default TotalStakedCard