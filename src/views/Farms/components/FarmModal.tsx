import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/LPCard'
import Heading from '../../../uikit/components/Heading/Heading'
import Flex from '../../../uikit/components/Flex/Flex'
import { CloseIcon } from '../../../uikit/components/Svg'
import { Button, IconButton } from '../../../uikit/components/Button'
import { InjectedProps } from '../../../uikit/widgets/Modal/types'
import { useUnstakeGenesisPools, useUnstakeRavPools, useUnstakeRsharePools } from 'hooks/useUnstake'
import StatisticCards from './StatisticCards'
import TokenCards from './TokenCards'
import BigNumber from 'bignumber.js'
import { useMatchBreakpoints } from 'uikit'

interface Props extends InjectedProps {
  onBack?: () => void
  farm: FarmWithStakedValue
  tvl: string
  dailyApr: string
}

const StyledModal = styled.div`
  position: relative;
  background-image: url('images/other/FarmCard.svg');
  background-size: contain;
  background-repeat: no-repeat;
  // box-shadow: 0 0 16px #00e0a0;
  // border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 32px;
  width: 800px;
  height: 720px;
  z-index: 99;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1080px) {
    width: 100%;
    background-image: none;
    background-color: #158BCE;
    height: 100%;
    border-radius: 0;
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  text-align: center;
  margin-top: 48px;
`

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
  flex-direction: column;
`

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const FarmModal: React.FC<Props> = ({
  onDismiss,
  onBack,
  farm,
  tvl,
  dailyApr,
}) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  const [pending, setPending] = useState(false)
  console.log('farm: ', farm)
  const stakedBalance = useMemo(() => new BigNumber(farm?.userData?.stakedBalance), [farm?.userData?.stakedBalance])

  const { onUnstakeGenesisPools } = useUnstakeGenesisPools(farm.pid)
  const { onUnstakeRsharePools } = useUnstakeRsharePools(farm.pid)
  const { onUnstakeRavPools } = useUnstakeRavPools(farm.pid)

  /*   const fullBalance = useMemo(() => {
      return getFullDisplayBalance(stakedBalance, farm.decimals)
    }, [stakedBalance, farm.decimals]) */

  const handleExit = async () => {
    setPending(true)
    try {
      if (farm.isGenesis) await onUnstakeGenesisPools(new BigNumber(stakedBalance).toFixed())
      else if (farm.isRavPool) await onUnstakeRavPools(new BigNumber(stakedBalance).toFixed())
      else await onUnstakeRsharePools(new BigNumber(stakedBalance).toFixed())
    }
    catch (e) {
      console.log('an error occured while claiming and withdrawing: ', e)
    }
    finally {
      setPending(false)
      onDismiss()
    }
  }

  const swapLink = farm.isTokenOnly ? `https://app.occam-x.fi/swap?outputCurrency=${farm.tokenAddresses[CHAIN_ID]}` : `https://app.occam-x.fi/liquidity/add${'/'/*0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9/${farm.lpAddresses[CHAIN_ID] */}`

  const swapText = farm.isTokenOnly ? `BUY ${farm.tokenSymbol}` : `ADD LIQUIDITY ${farm.lpSymbol}`

  return (
    <StyledModal>
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ fontSize: isMobile ? "14px" : '16px', marginTop: '0' }}>Deposit {farm.lpSymbol} and earn {farm.isGenesis || farm.isRavPool ? "RAV" : "RSHARE"}</Heading>
        </ModalTitle>
      </ModalHeader>
      <StatisticCards farm={farm} tvl={tvl} dailyApr={dailyApr} isMobile={isMobile} />
      <TokenCards farm={farm} onDismiss={onDismiss} isMobile={isMobile} />
      {
        <a href={swapLink} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', marginTop: isMobile ? '32px' : '16px', textAlign: 'center' }}>
          <Button size='md' style={{ backgroundColor: '#00fff23c', boxShadow: '0 4px 6px -4px #000', fontSize: '15px', width: isMobile ? '80%' : '100%' }}>{swapText}</Button>
        </a>
      }
      {!isMobile && <Button size='md' onClick={handleExit} disabled={pending} mt="16px" style={{ background: 'linear-gradient(180deg, rgba(0, 62, 120, 1) 0%, rgba(21, 139, 206, 0.6) 100%)', boxShadow: '0 4px 6px -4px #000' }}>CLAIM {'&'} WITHDRAW</Button>}
      <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{ position: 'absolute', right: isMobile ? '20px' : '190px', top: !isMobile && '20px' }}>
        <CloseIcon color="primary" style={{ fill: '#fff' }} />
      </IconButton>
    </StyledModal>
  )
}

export default FarmModal