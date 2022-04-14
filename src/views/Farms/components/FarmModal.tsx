import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/LPCard'
import Heading from '../../../uikit/components/Heading/Heading'
import Flex from '../../../uikit/components/Flex/Flex'
import { ArrowBackIcon, CloseIcon } from '../../../uikit/components/Svg'
import { Button, IconButton } from '../../../uikit/components/Button'
import { InjectedProps } from '../../../uikit/widgets/Modal/types'
import { getRavAddress, getRshareAddress } from 'utils/addressHelpers'
import { useUnstakeGenesisPools, useUnstakeRavPools, useUnstakeRsharePools } from 'hooks/useUnstake'
import StatisticCards from './StatisticCards'
import TokenCards from './TokenCards'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useMatchBreakpoints } from 'uikit'

interface Props extends InjectedProps {
  onBack?: () => void
  farm: FarmWithStakedValue
  tvl: string
  dailyApr: string
}

const StyledModal = styled.div`
  position: relative;
  background-image: url('images/other/FarmCard.png');
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

const ModalContent = styled.div`
  padding: 1rem;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  text-align: center;
  margin-top: 32px;
`

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
  flex-direction: column;
`

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
  console.log('farm: ', farm?.apy?.times(100).toNumber())

  const stakedBalance = useMemo(() => new BigNumber(farm?.userData?.stakedBalance), [farm?.userData?.stakedBalance])

  const { onUnstakeGenesisPools } = useUnstakeGenesisPools(farm.pid)
  const { onUnstakeRsharePools } = useUnstakeRsharePools(farm.pid)
  const { onUnstakeRavPools } = useUnstakeRavPools(farm.pid)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakedBalance, farm.decimals)
  }, [stakedBalance, farm.decimals])

  const handleExit = async () => {
    setPending(true)
    try {
      if (farm.isGenesis) await onUnstakeGenesisPools(fullBalance)
      else if (farm.isRavPool) await onUnstakeRavPools(fullBalance)
      else await onUnstakeRsharePools(fullBalance)
    }
    finally {
      setPending(false)
    }
  }

  return (
    <StyledModal>
      <ModalHeader>
        <ModalTitle>
          {onBack && (
            <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
              <ArrowBackIcon color="primary" />
            </IconButton>
          )}
          <Heading style={{ fontSize: isMobile && "16px" }}>EARN {farm.isGenesis || farm.isRavPool ? "RAV" : "RSHARE"} by staking {farm.lpSymbol}</Heading>
          <Heading style={{ fontSize: isMobile ? "14px" : '16px', marginTop: '0' }}>Deposit {farm.lpSymbol} and earn {farm.isGenesis || farm.isRavPool ? "RAV" : "RSHARE"}</Heading>
        </ModalTitle>
      </ModalHeader>
      <StatisticCards farm={farm} tvl={tvl} dailyApr={dailyApr} isMobile={isMobile} />
      <TokenCards farm={farm} onDismiss={onDismiss} isMobile={isMobile} />
      {(farm.lpSymbol === 'RAV-wADA LP' || farm.lpSymbol === 'RSHARE-wADA LP') &&
        <a href={`https://www.milkyswap.exchange/add/0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9/${farm.lpSymbol === 'RAV-wADA LP' ? getRavAddress() : getRshareAddress()}`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', marginTop: isMobile ? '32px' : '16px', textAlign: 'center' }}>
          <Button size='md' style={{ backgroundColor: '#00fff23c', boxShadow: '0 4px 6px -4px #000', fontSize: '15px', width: isMobile ? '80%' : '100%' }}>Provide liquidity for {farm.lpSymbol} pair now on MilkySwap</Button>
        </a>}
      {!isMobile && <Button size='md' onClick={handleExit} disabled={pending} mt="16px" style={{ background: 'linear-gradient(180deg, rgba(0, 62, 120, 1) 0%, rgba(21, 139, 206, 0.6) 100%)', boxShadow: '0 4px 6px -4px #000' }}>CLAIM {'&'} WITHDRAW</Button>}
      <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{ position: 'absolute', right: '20px', border: '2px solid #007ABE' }}>
        <CloseIcon color="primary" />
      </IconButton>
    </StyledModal>
  )
}

export default FarmModal