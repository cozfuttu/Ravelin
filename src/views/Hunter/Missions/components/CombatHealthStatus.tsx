/* eslint no-nested-ternary: "off" */
/* eslint react-hooks/exhaustive-deps: "off" */

import React, { useState, useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { Flex, Text } from 'uikit'
import { getRandomNumber } from '../utils/CombatTextUtils'


const OuterContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 1;
`

interface ContainerProps {
  type: 'one' | 'two'
}

const HealthBarContainer = styled.div<ContainerProps>`
  display: flex;
  width: 80%;
  background-color: #c60000;
  height: 1.75rem;
  justify-content: ${(props) => (props.type === 'one' ? 'flex-start' : 'flex-end')};
  border: ridge;
  border-width: 5px;
  border-radius: 12px;
  overflow: hidden;
`

interface HealthProps {
  oldHealth: number
  newHealth: number
  attackStyle: 'heal' | 'takeDamage' | null
}

const healthAnim = (oldHealth, newHealth) => keyframes`
  0% {
    width: ${oldHealth}%;
  }
  100% {
    width: ${newHealth}%;
  }
`

const Health = styled.div<HealthProps>`
  width: ${(props) => `${props.oldHealth}%`};
  height: 100%;
  background-color: #007236;
  align-self: flex-end;
  animation: ${props => healthAnim(props.oldHealth, props.newHealth)} 0.5s;
  animation-delay: ${props => props.attackStyle === 'heal' ? '1.1s' : '0.65s'};
`

interface CombatTextProps {
  hunterName: string
  health: number
  attackStyle: 'heal' | 'takeDamage' | null
}

export const HealthStatus: React.FC<CombatTextProps> = ({ health = 100, hunterName, attackStyle }) => {
  const [healthState, setHealthState] = useState(health)

  useEffect(() => {
    let timeout
    if (attackStyle === 'heal') {
      timeout = setTimeout(() => {
        setHealthState(health)
      }, 1550)
    } else if (attackStyle === 'takeDamage') {
      timeout = setTimeout(() => {
        setHealthState(health)
      }, 1100)
    }

    return () => {
      clearInterval(timeout)
    }
  }, [health])

  return (
    <OuterContainer>
      <Text marginBottom="10px">{hunterName}</Text>
      <HealthBarContainer type="one">
        <Health key={healthState} newHealth={health} oldHealth={healthState} attackStyle={attackStyle} />
      </HealthBarContainer>
    </OuterContainer>
  )
}

const pulse = keyframes`
  0% {
    font-size: 2rem;
  }
  25% {
    font-size: 3rem;
    color: #ff0000;
  }
  75% {
    font-size: 2rem;
  }
`

const BugCountTextAnimated = styled(Text) <{ shouldAnimate: boolean }>`
  width: 60px;
  height: 50px;
  color: #00E0A0;
  animation: '';
  ${props => props.shouldAnimate && css`
    animation: ${pulse} ${props.shouldAnimate ? '1s' : '0s'};
  `}
`

interface BugCountTextProps {
  bugCount: number
  attackStyle: 'shoot' | 'grenade' | null
}

export const BugCountText: React.FC<BugCountTextProps> = ({ bugCount = 0, attackStyle }) => {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [bugCountState, setBugCountState] = useState(bugCount)

  useEffect(() => {
    let timeout1
    let timeout2

    if (bugCount !== bugCountState) {
      if (attackStyle === 'grenade') {
        timeout1 = setTimeout(() => {
          setBugCountState(bugCount)
          if (!shouldAnimate) setShouldAnimate(true)
        }, 2500)
      } else if (attackStyle === 'shoot') {
        const bugKilledAmount = bugCount - bugCountState
        const randomFirstKill = getRandomNumber(bugKilledAmount - 2) + 1
        const randomSecondKill = bugKilledAmount - randomFirstKill

        timeout1 = setTimeout(() => {
          setBugCountState(bugCountState + randomFirstKill)
          if (!shouldAnimate) setShouldAnimate(true)
        }, 200)

        timeout2 = setTimeout(() => {
          setBugCountState(bugCount)
          if (!shouldAnimate) setShouldAnimate(true)
        }, 1500)
      }
    }

    return () => {
      clearInterval(timeout1)
      clearInterval(timeout2)
    }
  }, [bugCount])

  return (
    <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
      <Text mr='0.5rem' mb='12px'>Total Bugs Killed:</Text>
      <BugCountTextAnimated shouldAnimate={shouldAnimate} key={bugCountState} fontSize='2rem'>{bugCountState}</BugCountTextAnimated>
    </div>
  )
}

const ClockImage = styled.img`
  position: absolute;
  transition: opacity 2s linear;
  object-fit: cover;
  width: 80px;
  z-index: -1;
`

const DeadImage = styled.img`
  object-fit: cover;
  width: 40px;
  margin-top: 20px;
`

export const CombatCounter: React.FC<{ initialTime: number, isDead: boolean }> = ({ initialTime, isDead }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime)

  useEffect(() => {
    const intervalForTimeRemaining = setTimeout(() => {
      if (timeRemaining > 0) setTimeRemaining(timeRemaining - 1)
    }, 1000)

    return () => {
      clearInterval(intervalForTimeRemaining)
    }
  })

  return (
    <div style={{ display: 'flex', width: '80px', height: '80px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ClockImage src='/images/animatedMission/clock.png' />
      {isDead ? <DeadImage src='/images/animatedMission/dead.png' />
        : <Text fontSize='30px' mt='20px'>{timeRemaining}</Text>}
    </div>
  )
}
