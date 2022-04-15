import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import React, { useMemo } from 'react'
import { Farm } from 'state/types'
import styled from 'styled-components'
import { Button, Text, useModal } from 'uikit'
import { apyModalRoi, calculateCakeEarnedPerThousandDollars } from 'utils/compoundApyHelpers'
import FarmModal from './FarmModal'

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F2F2F2;
  box-shadow: 0 8px 10px -4px #000;
  width: 550px;
  height: 245px;
  padding: 1em;
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
  
`

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface CardProps {
  farm: FarmWithStakedValue
  earnLabel: string
  rsharePrice?: BigNumber
  nativePrice?: BigNumber
  ethereum?: any
  account?: string
  isMobile?: boolean
}

const LPCard: React.FC<CardProps> = ({ farm, earnLabel, nativePrice, rsharePrice, isMobile }) => {

  const farmName = farm.isTokenOnly
    ? `${farm.tokenSymbol.toLowerCase()}`
    : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken || new BigNumber(farm.lpTotalInQuoteToken).isLessThan(1)) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.ADA) {
      return nativePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [nativePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString('en', { maximumFractionDigits: 0 })}`
    : '-'

  const isFarmFinished = farm.poolEndTime * 1000 <= Date.now()

  const farmApy = !isFarmFinished ? farm.apy?.times(new BigNumber(100)).toNumber() : 0

  const farmApyString = farmApy?.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const oneThousandDollarsWorthOfCake = 1000 / rsharePrice.toNumber()

  const cakeEarnedPerThousand1D = calculateCakeEarnedPerThousandDollars({ numberOfDays: 1, farmApy, cakePrice: rsharePrice })

  const dailyApr = apyModalRoi({ amountEarned: cakeEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfCake })

  const [onPresentFarmView] = useModal(
    <FarmModal farm={farm} tvl={totalValueFormated} dailyApr={dailyApr} />,
  )

  return (
    <Card>
      <Col>
        <Text color='#9D9D9D' fontSize={isMobile ? '26px' : '32px'} bold mb='8px'>{farmName.toUpperCase()} {!(farm.isTokenOnly) && 'LP'}</Text>
        <Text color='#4E4E4E' fontSize='16px' mb="4px">Deposit {farmName.toUpperCase()} {!(farm.isTokenOnly) && 'LP'} Earn {earnLabel.toUpperCase()}</Text>
        <Text color='#9D9D9D' fontSize='14px'>APR: {farmApyString}%</Text>
        <Text color='#9D9D9D' fontSize='14px'>Daily APR: {dailyApr}%</Text>
        <Text color='#9D9D9D' fontSize='14px'>TVL: {totalValueFormated}</Text>
        {farm.depositFeeBP ? <Text color='#9D9D9D' fontSize='14px'>Deposit Fee: {farm.depositFeeBP / 100}%</Text> : null}
      </Col>
      <Col>
        <Image src={`images/icons/${farmName}.png`} style={{ width: farm.isTokenOnly ? '100px' : '128px' }} />
        <Button size='sm' style={{ alignSelf: 'center' }} onClick={onPresentFarmView}>VIEW</Button>
      </Col>
    </Card>
  )
}

export default LPCard