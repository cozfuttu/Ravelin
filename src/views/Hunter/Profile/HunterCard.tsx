import React from 'react'
import styled from 'styled-components'
import { useHunter } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import getNameByRarity from './utils/getNameByRarity'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  text-align: center;
  background-color: #000000bb;
  border: 3px solid #165b54;
  border-radius: 8px;
`

/* allowanceHunter: BigNumber;
allowanceMission: BigNumber;
tokenId: number;
maxNftLevel: number;
totalTry: number;
totalSuccess: number;
totalReward: number;
userHasHunter: boolean;
hunterName: string;
hunterLevel: number;
hunterRarity: number;
hunterXp: number;
hunterNeedXpToLevelUp: number;
hunterTotalXp: number;
hunterOwner: string;
hunterCreator: string;
hunterTotalTry: number;
hunterTotalSuccess: number;
hunterNextTryBlock: number;
hunterNextTryTime: number;
hunterInMission: boolean; */

const HunterImage = styled.img`
  max-width: 450px;
`

const HunterCard = () => {
  const { userData, hunterPrice } = useHunter()
  const { allowanceHunter, tokenId, userHasHunter, hunterName, hunterLevel, hunterRarity, hunterXp, hunterNeedXpToLevelUp, hunterTotalXp, hunterTotalTry, hunterTotalSuccess } = userData
  const { account } = useWallet()

  const isApproved = account && allowanceHunter && allowanceHunter.isGreaterThan(0)

  const imageUri = `/images/nfts/PolygalacticHunter${hunterRarity}.webp`
  const nameByRarity = getNameByRarity(hunterRarity)

  if (!userHasHunter) return (
    <Card>
      <HunterImage src={'/images/nfts/PolygalacticHunter4.webp'} alt="Hunter Image" />
    </Card>
  )

  return (
    <Card>
      <HunterImage src={imageUri} alt="Hunter Image" />
    </Card>
  )
}

export default HunterCard