/* eslint react/jsx-curly-brace-presence: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, useMatchBreakpoints } from 'uikit'
import ModalActions from 'components/ModalActions'
import { HunterMissionData } from 'state/types'
import getCombatData, { INITIAL_FIGHTER_HEALTH, MAX_COMBAT_TURN_COUNT } from '../utils/CombatLogic'
import { HealthStatus, BugCountText, CombatCounter } from './CombatHealthStatus'
import MissionStatusBar from './MissionStatusBar'

interface GameInfoModalProps {
  missionData: HunterMissionData
  missionResult: string
  onCloseModal?: () => void
  onDismiss?: () => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 32px;
  max-width: 720px;
  width: 90vw;
  max-height: 800px;
  box-shadow: 0px 0px 30px 10px #00e0a0;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const HealthContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  justify-content: space-between;
  align-content: flex-end;
  flex-wrap: 'wrap';
  height: 80px;
`

const ANIMATION_DURATION = 3050
const INITIAL_TIME_REMAINING = Math.round(MAX_COMBAT_TURN_COUNT * ANIMATION_DURATION / 1000) - 1

const GameConclusionModal: React.FC<GameInfoModalProps> = ({ missionData, missionResult, onCloseModal, onDismiss }) => {
  const [combatState, setCombatState] = useState([])
  const [combatIndex, setCombatIndex] = useState(0)

  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  console.log('asdsad', isMobile)

  useEffect(() => {
    const _combatData = getCombatData(missionResult)

    setCombatState(_combatData)
  }, [missionResult])

  useEffect(() => {
    const intervalForAnimationPlay = setTimeout(() => {
      if (combatIndex + 1 < combatState.length) {
        setCombatIndex(combatIndex + 1)
      }
    }, ANIMATION_DURATION)

    return () => {
      clearInterval(intervalForAnimationPlay)
    }
  })

  const handleCloseModal = () => {
    onDismiss()

    if (onCloseModal) {
      onCloseModal()
    }
  }

  const gifSrc = combatState?.length ? `/images/polygalacticGif/${combatState[combatIndex].animationName}.webp` : ''

  return (
    <Container>
      <Modal title="Mission Result" onDismiss={handleCloseModal} bodyPadding='12px 12px'>
        {!isMobile
          ? <div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <CombatCounter initialTime={INITIAL_TIME_REMAINING} isDead={combatState?.length ? combatState[combatIndex].newHealths[0] <= 0 : false} />
            </div>

            <HealthContainer>
              <HealthStatus health={combatState?.length ? combatState[combatIndex].newHealths[0] : INITIAL_FIGHTER_HEALTH} hunterName='Hunter' attackStyle={combatState?.length ? combatState[combatIndex].id : null} />
              <BugCountText bugCount={combatState?.length ? combatState[combatIndex].newHealths[1] : 0} attackStyle={combatState?.length ? combatState[combatIndex].id : null} />
              {combatState?.length && <MissionStatusBar health={combatState[combatIndex].oldHealths[0]} bugCount={combatState[combatIndex].oldHealths[1]} />}
            </HealthContainer>
          </div>
          : <HealthStatus health={combatState?.length ? combatState[combatIndex].newHealths[0] : INITIAL_FIGHTER_HEALTH} hunterName='Hunter' attackStyle={combatState?.length ? combatState[combatIndex].id : null} />
        }

        <div style={{ marginTop: '5px', marginBottom: '20px' }}>
          <img src={gifSrc} alt="h" loading='eager' hidden={combatIndex + 1 === combatState.length} />
          <img src={`/images/polygalacticGif/${missionResult === '1' ? 'HunterEndDead' : 'HunterEndAlive'}.webp`} alt="haa" loading='eager' hidden={combatIndex + 1 < combatState.length} />
        </div>

        {isMobile && <HealthContainer>
          <BugCountText bugCount={combatState?.length ? combatState[combatIndex].newHealths[1] : 0} attackStyle={combatState?.length ? combatState[combatIndex].id : null} />
          {combatState?.length && <MissionStatusBar health={combatState[combatIndex].oldHealths[0]} bugCount={combatState[combatIndex].oldHealths[1]} />}
        </HealthContainer>}
        {isMobile && <div style={{ display: 'flex', flex: 1, justifyContent: 'center', marginTop: '20px' }}>
          <CombatCounter initialTime={INITIAL_TIME_REMAINING} isDead={combatState?.length ? combatState[combatIndex].newHealths[0] <= 0 : false} />
        </div>}

        <ModalActions>
          <Button onClick={handleCloseModal}>
            Close
          </Button>
        </ModalActions>
      </Modal>
    </Container>
  )
}

export default GameConclusionModal
