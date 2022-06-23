import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from 'uikit'
import { DateTime } from 'luxon'
import { useCurrentTime } from 'hooks/useTimer'

const Container = styled.div`
  margin-bottom: 6vh;
`

const ClockDiv = styled.div`
  font-family: sans-serif;
  color: #ffffff;
  display: inline-block;
  font-weight: 100;
  text-align: center;
  font-size: 30px;
`

const ClockTimeSide = styled.div`
  padding: 10px;
  border-radius: 3px;
  background: #158bce;
  display: inline-block;
  margin-right: 10px;
  min-width: 95px;
  margin-bottom: 10px;
`

const ClockTimeSideSpan = styled.span`
  border-radius: 3px;
  background: #158bce;
  display: inline-block;
  margin-right: 10px;
`

const ClockTimeSideLabel = styled.span`
  border-radius: 3px;
  display: inline-block;
  padding-top: 5px;
  font-size: 16px;
`

const CountDown = () => {
  const currentTimeMillis = useCurrentTime()

  const lNow = DateTime.fromMillis(currentTimeMillis).setZone('utc')
  const nowObject = lNow.toObject()
  const nowHour = nowObject.hour
  const nowMinute = nowObject.minute
  const nowDay = lNow.weekday
  // const nowSecond = nowObject.second

  const lTargetTime = DateTime.fromMillis(1656104399000).setZone('utc')
  const timeDiff = lTargetTime.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')

  const remainingHours = timeDiff.get('hours')
  const remainingMinutes = timeDiff.get('minutes')
  const remainingSeconds = Math.floor(timeDiff.get('seconds'))

  let showCounter = true

  if (nowHour === 20 && nowMinute >= 0 && nowMinute < 3) {
    showCounter = false
  }

  return showCounter ? (
    <Container>
      <Heading as="h1" size="lg" mb="20px" color="#4E4E4E" style={{ alignContent: 'center', textAlign: 'center' }}>
        Missions will start in
      </Heading>
      <div style={{ alignContent: 'center', textAlign: 'center' }}>
        <ClockDiv>
          <ClockTimeSide>
            <ClockTimeSideSpan className="hours">{remainingHours}</ClockTimeSideSpan>
            <ClockTimeSideLabel>Hours</ClockTimeSideLabel>
          </ClockTimeSide>
          <ClockTimeSide>
            <ClockTimeSideSpan className="minutes">{remainingMinutes}</ClockTimeSideSpan>
            <ClockTimeSideLabel>Min</ClockTimeSideLabel>
          </ClockTimeSide>
          <ClockTimeSide>
            <ClockTimeSideSpan className="seconds">{remainingSeconds}</ClockTimeSideSpan>
            <ClockTimeSideLabel>Sec</ClockTimeSideLabel>
          </ClockTimeSide>
        </ClockDiv>
      </div>
    </Container>
  ) : null
}

export default CountDown
