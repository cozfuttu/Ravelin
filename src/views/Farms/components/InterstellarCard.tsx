import BigNumber from 'bignumber.js'
import useCurrentTime from 'hooks/useTimer'
import { DateTime } from 'luxon'
import React, { useMemo } from 'react'
import { Interstellar } from 'state/types'
import styled from 'styled-components'
import { Button, Text, useModal } from 'uikit'
import { apyModalRoi, calculateCakeEarnedPerThousandDollars } from 'utils/compoundApyHelpers'
import FarmModal from './FarmModal'

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F2F2F2;
  box-shadow: 0 6px 10px -4px #646464;
  width: 435px;
  height: 250px;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  z-index: 1;

  @media (max-width: 1080px) {
    width: 90%;
    height: 300px;
  }
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 90%;
  padding: 8px;
  justify-content: space-between;
`

const Image = styled.img`
  width: 80px;
`

const TextAntonio = styled.div`
  font-family: 'Antonio', sans-serif;
  color: #9D9D9D;
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 8px;
`

export interface InterstellarWithStakedValue extends Interstellar {
  apy?: BigNumber
}

interface CardProps {
  interstellar: InterstellarWithStakedValue
  earnLabel: string
  rsharePrice?: BigNumber
  nativePrice?: BigNumber
  ethereum?: any
  account?: string
  isMobile?: boolean
}

const InterstellarCard: React.FC<CardProps> = ({ interstellar, earnLabel, nativePrice, rsharePrice, isMobile }) => {

  const farmImage = interstellar.rewardTokenSymbol.toLowerCase()

  const totalValue: BigNumber = useMemo(() => {
    if (!interstellar.stakedTokenAmount) {
      return null
    }
    return new BigNumber(interstellar.stakedTokenAmount).times(interstellar.stakeTokenPrice)
  }, [interstellar.stakedTokenAmount, interstellar.stakeTokenPrice])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString('en', { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = `EARN ${interstellar.rewardTokenSymbol}`
  const interstellarApyString =
    interstellar.apy &&
    interstellar.apy.times(new BigNumber(100)).toNumber().toLocaleString('en', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  const farmApy = interstellar.apy.times(new BigNumber(100)).toNumber()
  const rewardTokenPrice = interstellar.rewardTokenPrice
  const oneThousandDollarsWorthOfReward = 1000 / new BigNumber(rewardTokenPrice).toNumber()

  const rewardEarnedPerThousand1D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 1, farmApy, cakePrice: rewardTokenPrice })

  const dailyApr = apyModalRoi({ amountEarned: rewardEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfReward })

  const [onPresentinterstellarView] = useModal(
    <FarmModal interstellar={interstellar} tvl={totalValueFormated} dailyApr={dailyApr} />,
  )

  const currentTimeMillis = useCurrentTime()

  const lNow = DateTime.fromMillis(currentTimeMillis).setZone('utc')
  const lTargetEnd = DateTime.fromMillis(interstellar?.endBlock * 1000).setZone('utc')
  const timeDiffEnd = lTargetEnd.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')
  const isFinished = timeDiffEnd.toMillis() < 0

  const lTargetStart = DateTime.fromMillis((interstellar?.startBlock) * 1000).setZone('utc')
  const timeDiffStart = lTargetStart.diff(lNow).shiftTo('days', 'hours', 'minutes', 'seconds')
  const isStarted = timeDiffStart.toMillis() < 0

  return (
    <Card>
      <Col>
        <TextAntonio style={{ fontSize: isMobile && '26px' }}>{lpLabel}</TextAntonio>
        <Text color='#4E4E4E' fontSize='14px' mb="4px">Deposit RAV Earn {earnLabel}</Text>
        <Text color='#9D9D9D' fontSize='14px'>APR: {interstellarApyString}%</Text>
        <Text color='#9D9D9D' fontSize='14px'>Daily APR: {dailyApr}%</Text>
        <Text color='#9D9D9D' fontSize='14px'>TVL: {totalValueFormated}</Text>
        {!isStarted && <Text color='#9D9D9D' fontSize='14px'>Starts in: {timeDiffStart.toFormat("dd:hh:mm:ss")}</Text>}
        {timeDiffEnd.days < 10 && isStarted && <Text color={isFinished ? '#af101d' : '#9D9D9D'} fontSize='14px'>{!isFinished && 'Ends in:'} {isFinished ? 'Finished!' : timeDiffEnd.toFormat("dd:hh:mm:ss")}</Text>}
      </Col>
      <Col>
        <Image src={`images/icons/${farmImage}.png`} />
        <Button size='sm' style={{ alignSelf: 'flex-end' }} onClick={onPresentinterstellarView}>VIEW</Button>
      </Col>
    </Card>
  )
}

export default InterstellarCard