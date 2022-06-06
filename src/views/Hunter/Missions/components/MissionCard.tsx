/* eslint react-hooks/exhaustive-deps: "off" */
/* eslint no-unneeded-ternary: "off" */
/* eslint no-nested-ternary: "off" */
import React, { memo } from 'react'
import styled from 'styled-components'
import { CardBody, Heading, Text, Flex, Link } from 'uikit'
import { HunterMissionData } from 'state/types'
import GameInfoButton from './CardActions'
import calculateCooldown from 'views/Hunter/utils/calculateCooldown'
import calculateRewards from 'views/Hunter/utils/calculateRewards'

const NCard = styled.div`
  border: 4px solid #165b54;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  background-color: #0e38345a;
  max-width: 300px;

  @media (max-width: 1080px) {
    max-width: 300px;
    max-height: 900px;
    margin-left: 5%;
  }
`

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: -16px;
  gap: 0.5vh;
`

const StyledImage = styled.img`
  width: 30%;
`

interface MissionCardProps {
  missionInfo: HunterMissionData | null
  account: string
}

const REWARD_LIMIT_MULTIPLIER = 24

const MissionCard: React.FC<MissionCardProps> = memo(({ missionInfo, account }) => {
  const { canBeThey, xp, price, reward, totalReward, balanceOfTokenInContract: rewardLeft, playableWith, gain, missionId, cooldown, imageUri, name, requiredRarity } = missionInfo
  const priceTokenName = playableWith.toUpperCase() || ''
  const rewardTokenName = gain.toUpperCase() || ''
  const cooldownText = calculateCooldown(cooldown)
  const { mediocreReward, successReward, greatReward } = calculateRewards(reward, rewardTokenName)

  const isRewardFinished = rewardLeft <= reward * REWARD_LIMIT_MULTIPLIER

  const totalRewardFormatted = Number(totalReward) >= 1e9 ? `${reward / 1e9} Bil ${rewardTokenName}` :
    totalReward
      ? `${Number(totalReward).toLocaleString('en', { maximumFractionDigits: 5 })} ${rewardTokenName}`
      : '-'

  const rewardLeftFormatted = Number(isRewardFinished ? 0 : rewardLeft) >= 1e9 ? `${rewardLeft / 1e9} Bil ${rewardTokenName}` :
    rewardLeft
      ? `${Number(isRewardFinished ? 0 : rewardLeft).toLocaleString('en', { maximumFractionDigits: 5 })} ${rewardTokenName}`
      : '-'

  const priceValueFormatted =
    price
      ? `${Number(price).toLocaleString('en', { maximumFractionDigits: 5 })} ${priceTokenName}`
      : '-'

  return (
    <NCard>
      <CardBody p='12px'>
        <Header>
          <StyledImage src={imageUri} />
          <Heading style={{ fontSize: '20px', textAlign: 'start' }} color="#00E0A0">
            {name.toUpperCase()}
          </Heading>
        </Header>
        <InfoContainer>
          <Flex justifyContent="space-between">
            <Text style={{ fontSize: '16px', textAlign: 'start' }} color="#00E0A0">
              Cost:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {priceValueFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text style={{ fontSize: '16px', textAlign: 'start' }} color="#00E0A0">
              Mediocre Success:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {mediocreReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text style={{ fontSize: '16px', textAlign: 'start' }} color="#00E0A0">
              Success:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {successReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text style={{ fontSize: '16px', textAlign: 'start' }} color="#00E0A0">
              Great Success:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {greatReward}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: '100%' }}>
            <Text style={{ fontSize: '16px' }} color="#00E0A0">
              Reward Distributed:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {totalRewardFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: '100%' }}>
            <Text style={{ fontSize: '16px' }} color="#00E0A0">
              Rewards Left:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {rewardLeftFormatted}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: '100%' }}>
            <Text style={{ fontSize: '16px' }} color="#00E0A0">
              Cooldown:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {cooldownText}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" style={{ width: '100%' }} mb='2vh'>
            <Text style={{ fontSize: '16px' }} color="#00E0A0">
              Level Required to Play:
            </Text>
            <Text bold style={{ fontSize: '16px', textAlign: 'end' }}>
              {(25 * (requiredRarity - 1)) + 1}
            </Text>
          </Flex>
          {/*           <Flex justifyContent="center" style={{ width: '100%' }} mb='2vh'>
            {buyLink}
          </Flex> */}
        </InfoContainer>
      </CardBody>
      <GameInfoButton mission={missionInfo} account={account} isRewardFinished={isRewardFinished} canBeThey={canBeThey} />
    </NCard>
  )
})

export default MissionCard
