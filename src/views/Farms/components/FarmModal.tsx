import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/LPCard'
import Heading from '../../../uikit/components/Heading/Heading'
import Flex from '../../../uikit/components/Flex/Flex'
import { ArrowBackIcon, CloseIcon } from '../../../uikit/components/Svg'
import { Button, IconButton } from '../../../uikit/components/Button'
import { InjectedProps } from '../../../uikit/widgets/Modal/types'
import { getRavAddress, getRavNativeLPAddress, getRshareAddress, getRshareNativeLPAddress } from 'utils/addressHelpers'
import { useUnstakeGenesisPools, useUnstakeRsharePools } from 'hooks/useUnstake'
import { useStakeGenesisPools, useStakeRsharePools } from 'hooks/useStake'
import StatisticCards from './StatisticCards'
import TokenCards from './TokenCards'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface Props extends InjectedProps {
  onBack?: () => void
  isMobile?: boolean
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
  isMobile = false,
  farm,
  tvl,
  dailyApr,
}) => {

  const [pending, setPending] = useState(false)
  console.log('farm: ', farm)

  const stakedBalance = new BigNumber(farm?.userData?.stakedBalance)

  const { onUnstakeGenesisPools } = useUnstakeGenesisPools(farm.pid)
  const { onUnstakeRsharePools } = useUnstakeRsharePools(farm.pid)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakedBalance, farm.decimals)
  }, [stakedBalance, farm.decimals])

  const handleExit = async () => {
    setPending(true)
    try {
      if (farm.isGenesis) await onUnstakeGenesisPools(fullBalance)
      else await onUnstakeRsharePools(fullBalance)
    }
    finally {
      setPending(false)
    }
  }

  return (
    <StyledModal style={{ width: isMobile && '90%', height: isMobile && '90%' }}>
      <ModalHeader>
        <ModalTitle>
          {onBack && (
            <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
              <ArrowBackIcon color="primary" />
            </IconButton>
          )}
          <Heading>EARN {farm.isGenesis ? "RAV" : "RSHARE"} by staking {farm.lpSymbol}</Heading>
          <Heading style={{ fontSize: '16px', marginTop: '0' }}>Deposit {farm.lpSymbol} and earn {farm.isGenesis ? "RAV" : "RSHARE"}</Heading>
        </ModalTitle>
      </ModalHeader>
      <StatisticCards farm={farm} tvl={tvl} dailyApr={dailyApr} />
      <TokenCards farm={farm} />
      {(farm.lpSymbol === 'RAV-ADA LP' || farm.lpSymbol === 'RSHARE-ADA LP') &&
        <a href={`https://spookyswap.finance/add/ETH/${farm.lpSymbol === 'RAV-ADA LP' ? getRavAddress() : getRshareAddress()}`} target="_blank" style={{ textDecoration: 'none', marginTop: '16px' }}>
          <Button size='md' style={{ backgroundColor: '#00fff23c', boxShadow: '0 4px 6px -4px #000', fontSize: '15px' }}>Provide liquidity for {farm.lpSymbol} pair now on SpookySwap</Button>
        </a>}
      <Button size='md' onClick={handleExit} disabled={pending} mt="16px" style={{ background: 'linear-gradient(180deg, rgba(0, 62, 120, 1) 0%, rgba(21, 139, 206, 0.6) 100%)', boxShadow: '0 4px 6px -4px #000' }}>CLAIM {'&'} WITHDRAW</Button>
      <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{ position: 'absolute', right: '20px', border: '2px solid #007ABE' }}>
        <CloseIcon color="primary" />
      </IconButton>
    </StyledModal>
  )
}

export default FarmModal