import React from 'react'
import styled from 'styled-components'
import { useHunter } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import getNameByRarity from '../utils/getNameByRarity'
import { Flex, Text } from 'uikit'
import CardActions from './CardActions'
import XpBar from './XPBar'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  const { userHasHunter, hunterName, hunterLevel, hunterRarity, hunterXp, hunterNeedXpToLevelUp, hunterTotalSuccess } = userData
  const { account } = useWallet()

  const imageUri = `/images/nfts/PolygalacticHunter${hunterRarity}.webp`
  const nameByRarity = getNameByRarity(hunterRarity)

  if (!userHasHunter) return (
    <Card>
      <HunterImage src={'/images/nfts/PolygalacticHunter4.webp'} alt="Hunter Image" />
      <Text>This hunter is on a hunt for various tokens.</Text>
      <Flex justifyContent="space-between">
        <Text>Price: </Text>
        <Text>{hunterPrice}&nbsp; <img src="/images/icons/rav.png" width={50} alt="RAV" /></Text>
      </Flex>
      <CardActions account={account} />
    </Card>
  )

  return (
    <Card>
      <HunterImage src={imageUri} alt="Hunter Image" />
      <Flex justifyContent="center" marginTop='16px'>
        <Text style={{ fontSize: '32px' }} color="#00E0A0">
          {hunterName}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '21px' }} color="#00E0A0">
          Rarity:
        </Text>
        <Text bold style={{ fontSize: '21px' }}>
          {nameByRarity}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '21px' }} color="#00E0A0">
          Level:
        </Text>
        <Text bold style={{ fontSize: '21px' }}>
          {hunterLevel}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '21px' }} color="#00E0A0">
          Until Next Level:
        </Text>
        <XpBar xp={hunterXp} needXpToLevelUp={hunterNeedXpToLevelUp} />
      </Flex>
      <Flex justifyContent="space-between">
        <Text style={{ fontSize: '21px' }} color="#00E0A0">
          Missions Completed:
        </Text>
        <Text bold style={{ fontSize: '21px' }}>
          {hunterTotalSuccess}
        </Text>
      </Flex>
    </Card>
  )
}

export default HunterCard