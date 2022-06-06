/* eslint react/jsx-curly-brace-presence: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint no-unused-expressions: "off" */
/* eslint react/jsx-no-target-blank: "off" */
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, useModal } from 'uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { HunterMissionData, HunterUserData } from 'state/types'
import ModalActions from 'components/ModalActions'
import useStartPolygalacticHunterMission from 'hooks/useStartPolygalacticHunterMission'
import useBlock from 'hooks/useBlock'
import checkLastMissionStatus from 'views/Hunter/utils/checkLastMissionStatus'
import getTimeLeftForNextMission from 'views/Hunter/utils/getTimeLeftForNextMission'
import useCurrentTime from 'hooks/useTimer'
import timeLeftForReveal from 'views/Hunter/utils/getTimeLeftForRevealResult'

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 640px;
  height: 480px;
`

const TextContainer = styled.div`
  margin-bottom: 10px;
`

const GridItem = styled.div`
  margin-bottom: 3vh;
`

interface GameInfoModalProps {
  mission: HunterMissionData
  userData: HunterUserData
  isRewardFinished: boolean
  tokenBalance: number
  onDismiss?: () => void
  onResult?: () => void
}

const GameWarningModal: React.FC<GameInfoModalProps> = ({ mission, userData, isRewardFinished, tokenBalance, onResult, onDismiss }) => {
  const { account } = useWallet()

  const { tokenId, hunterNextTryBlock: nextTryBlock, hunterRarity: rarity, userHasHunter: hasToken } = userData
  const { requiredRarity, price, nextPlayTime } = mission
  const { missionStartTime, isLastMissionReadyToReveal, isLastMissionViewed } = checkLastMissionStatus(account)
  const mstn = parseInt(missionStartTime)

  const currentBlock = useBlock()
  const currentTimeMilis = useCurrentTime()
  const { onStart } = useStartPolygalacticHunterMission(tokenId, requiredRarity)

  const [disabled, toggleDisabled] = useState(false)
  const isHunterReadyToTryMission = nextTryBlock <= currentBlock
  const isHunterReadyForNextMission = nextPlayTime * 1000 <= Date.now()

  useEffect(() => {
    if (!isLastMissionViewed && isLastMissionReadyToReveal) setButtonText("Mission Result")
    if (!isLastMissionViewed /*&&!isLastMissionReadyToReveal*/) setButtonText(`${timeLeftForReveal(currentTimeMilis, mstn)} left to finish the mission.`)
    if (isRewardFinished) setButtonText("Rewards are finalized!")
    if (tokenBalance < price) setButtonText("You don't have enough tokens!")
    if (!hasToken) setButtonText("You don't have a hunter!")
    if (rarity < requiredRarity) setButtonText("Your Hunter's rarity is not enough to start this mission!")
    if (!isHunterReadyForNextMission) setButtonText(`You need to wait ${getTimeLeftForNextMission(currentTimeMilis, nextPlayTime)} to start this mission again.`)
    else setButtonText("Start Mission")
  }, [isLastMissionViewed, isLastMissionReadyToReveal, isRewardFinished, tokenBalance, price, hasToken, rarity, requiredRarity, isHunterReadyForNextMission, currentTimeMilis, nextPlayTime, mstn])

  const [buttonText, setButtonText] = useState("")

  const handleButtonClick = () => {
    if (!isLastMissionViewed && isLastMissionReadyToReveal) return onResult
    if (rarity >= requiredRarity && tokenBalance >= price && !isRewardFinished && isHunterReadyForNextMission) return onStart
    else return null
  }

  return (
    <Modal title="Mission Details" onDismiss={onDismiss}>
      <Grid>
        <TextContainer>
          <GridItem>
            <Text style={{ alignContent: 'center', textAlign: 'center', marginTop: '5px' }} color="#00fff2">
              IMPORTANT WARNING!
            </Text>
            <Text style={{ alignContent: 'center', textAlign: 'center', marginTop: '5px' }}>
              DO NOT FORGET THAT YOUR HUNTER MIGHT DIE ON THE MISSION. IF SHE DIES, YOU&apos;LL RETAIN MOST OF YOUR
              EXPERIENCE.
            </Text>
          </GridItem>
          <GridItem>
            <Text style={{ alignContent: 'center', textAlign: 'center', marginTop: '5px' }} color="#ffffff">
              If your hunter does not get a response from Chainlink, you will be able to retry the mission.
            </Text>
          </GridItem>
          <GridItem>
            <Text style={{ alignContent: 'center', textAlign: 'center', marginTop: '5px' }} color="#00fff2">
              IT IS STRICTLY ADVISED TO READ ABOUT THE POLYGALACTIC HUNTER GITBOOK BEFORE STARTING!
            </Text>
          </GridItem>
          <GridItem>
            <Text style={{ alignContent: 'center', textAlign: 'center', marginTop: '5px' }}>
              <a
                style={{ color: '#e6e99f' }}
                href="https://pulsarfarm.gitbook.io/gamma-polypulsar/features/polygalactic-hunter-new-pve"
                target="_blank"
              >
                You can click here to read the Gitbook.
              </a>
            </Text>
          </GridItem>
        </TextContainer>
        <ModalActions>
          {
            <Button onClick={handleButtonClick} size="md">
              {buttonText}
            </Button>
          }
        </ModalActions>
      </Grid>
    </Modal>
  )
}

export default GameWarningModal
