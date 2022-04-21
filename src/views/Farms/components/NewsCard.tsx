import React from 'react'
import styled from 'styled-components'
import { Text } from 'uikit'

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(90deg, rgba(0, 62, 120, 1) 0%, rgba(0, 122, 190, 1) 100%);
  padding: 24px;
`

const Dates = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`

const Date = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Line = styled.div`
  background: linear-gradient(270deg, rgba(0, 122, 190, 1) 0%, rgba(0, 122, 190, 0) 100%);
  min-width: 2px;
  min-height: 64px;

  @media (max-width: 1080px) {
    min-height: 2px;
    min-width: 128px;
  }
`

const NewsCard = () => {
  return (
    <Card>
      <Text color="#fff" fontSize='28px' mb="16px" bold>STARTING DATES</Text>
      <Dates>
        <Date>
          <Text color="#fff" style={{ alignSelf: 'center' }} bold>Genesis Pools</Text>
          <Text color="#fff" style={{ alignSelf: 'center' }}>Start: 9 pm UTC, April 28</Text>
          <Text color="#fff" style={{ alignSelf: 'center' }}>End: 9 pm UTC, May 2</Text>
        </Date>
        <Line />
        <Date>
          <Text color="#fff" style={{ alignSelf: 'center' }} bold>RSHARE Rewards</Text>
          <Text color="#fff" style={{ alignSelf: 'center' }}>Start: 9 pm UTC, April 29</Text>
        </Date>
        <Line />
        <Date>
          <Text color="#fff" style={{ alignSelf: 'center' }} bold>Boardroom Rewards</Text>
          <Text color="#fff" style={{ alignSelf: 'center' }}>Start: 9 pm UTC, May 2</Text>
        </Date>
        <Line />
      </Dates>
    </Card>
  )
}

export default NewsCard