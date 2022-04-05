import React from 'react'
import Card from './Card'
import { useTokenBalanceOfContract } from 'hooks/useTokenBalance'
import { getMasonryAddress, getRshareAddress } from 'utils/addressHelpers'

const TotalStakedCard = () => {
  const stakedBalance = useTokenBalanceOfContract(getRshareAddress(), getMasonryAddress())
  const stakedBalanceFormatted = stakedBalance.div(1e18).toFormat(2)
  return (
    <Card heading='RSHARE STAKED' value={stakedBalanceFormatted} />
  )
}

export default TotalStakedCard