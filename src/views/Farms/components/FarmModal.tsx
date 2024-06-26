import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Farms/components/LPCard'
import Heading from '../../../uikit/components/Heading/Heading'
import Flex from '../../../uikit/components/Flex/Flex'
import { CloseIcon } from '../../../uikit/components/Svg'
import { Button, IconButton } from '../../../uikit/components/Button'
import { InjectedProps } from '../../../uikit/widgets/Modal/types'
import { useUnstakeGenesisPools, useUnstakeInterstellar, useUnstakeRavPools, useUnstakeRsharePools } from 'hooks/useUnstake'
import StatisticCards from './StatisticCards'
import TokenCards from './TokenCards'
import BigNumber from 'bignumber.js'
import { useMatchBreakpoints } from 'uikit'
import { InterstellarWithStakedValue } from './InterstellarCard'
import TokenCardsInterstellar from './TokenCardsInterstellar'
import { tokenAddresses } from 'config/constants/addresses'

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
    overflow-y: scroll;
  }
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  text-align: center;
  margin-top: 48px;
  
  @media (max-width: 1080px) {
    margin-top: 32px;
  }
`

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
  flex-direction: column;
`

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

interface Props extends InjectedProps {
  onBack?: () => void
  farm?: FarmWithStakedValue
  interstellar?: InterstellarWithStakedValue
  tvl: string
  dailyApr: string
}

const FarmModal: React.FC<Props> = ({
  onDismiss,
  onBack,
  farm,
  interstellar,
  tvl,
  dailyApr,
}) => {
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  const [pending, setPending] = useState(false)
  // console.log('farm: ', farm)
  const stakedBalance = useMemo(() => new BigNumber(farm ? farm?.userData?.stakedBalance : interstellar?.userData?.stakedBalance), [interstellar?.userData?.stakedBalance, farm])

  const { onUnstakeGenesisPools } = useUnstakeGenesisPools(farm?.pid)
  const { onUnstakeRsharePools } = useUnstakeRsharePools(farm?.pid)
  const { onUnstakeRavPools } = useUnstakeRavPools(farm?.pid)
  const { onUnstakeInterstellar } = useUnstakeInterstellar(interstellar?.contractAddress)

  /*   const fullBalance = useMemo(() => {
      return getFullDisplayBalance(stakedBalance, farm.decimals)
    }, [stakedBalance, farm.decimals]) */

  const handleExit = async () => {
    setPending(true)
    try {
      if (farm?.isGenesis) await onUnstakeGenesisPools(new BigNumber(stakedBalance).toFixed())
      else if (farm?.isRavPool) await onUnstakeRavPools(new BigNumber(stakedBalance).toFixed())
      else if (interstellar) await onUnstakeInterstellar(new BigNumber(stakedBalance).toFixed())
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

  const swapLink = farm
    ? !farm.isTokenOnly
      ? farm.lpSource === "MilkySwap"
        ? `https://www.milkyswap.exchange/add/milkADA/${farm.tokenAddresses[CHAIN_ID]}`
        : `https://app.occamx.fi/liquidity/add/${farm.quoteTokenAdresses[CHAIN_ID]}/${farm.tokenAddresses[CHAIN_ID]}`
      : `https://app.occamx.fi/swap/mAda/${farm.tokenAddresses[CHAIN_ID]}`
    : interstellar
      ? interstellar.isStakeLP
        ? `https://app.occamx.fi/liquidity/add/${interstellar.stakeTokenSymbol === "TPGX-mADA" ? `${tokenAddresses.tpgx}/mADA` : interstellar.stakeTokenSymbol === "TPGX-RAV" ? `${tokenAddresses.tpgx}/${tokenAddresses.rav}` : interstellar.stakeTokenSymbol === "TPGX-RSHARE" ? `${tokenAddresses.tpgx}/${tokenAddresses.rshare}` : ""}`
        : `https://app.occamx.fi/swap/mAda/${interstellar.stakeTokenAddress}`
      : ""

  const swapText = farm ? farm?.isTokenOnly ? `BUY ${farm?.tokenSymbol}` : `ADD LIQUIDITY ${farm?.lpSymbol}` : interstellar ? interstellar.isStakeLP ? `ADD LIQUIDITY ${interstellar?.stakeTokenSymbol}` : `BUY ${interstellar?.stakeTokenSymbol}` : ''

  return (
    <StyledModal>
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ fontSize: isMobile ? "14px" : '16px', marginTop: '0' }}>Deposit {farm?.lpSymbol} and earn {farm?.isGenesis || farm?.isRavPool ? "RAV" : interstellar ? interstellar.rewardTokenSymbol : "RSHARE"}</Heading>
        </ModalTitle>
      </ModalHeader>
      <StatisticCards farm={farm} interstellar={interstellar} tvl={tvl} dailyApr={dailyApr} isMobile={isMobile} />
      {farm ? <TokenCards farm={farm} onDismiss={onDismiss} isMobile={isMobile} /> : <TokenCardsInterstellar interstellar={interstellar} onDismiss={onDismiss} isMobile={isMobile} />}
      <a href={swapLink} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', marginTop: isMobile ? '32px' : '16px', textAlign: 'center' }}>
        <Button size='md' style={{ backgroundColor: '#00fff23c', boxShadow: '0 4px 6px -4px #000', fontSize: '15px', width: isMobile ? '80%' : '100%' }}>{swapText}</Button>
      </a>
      {!isMobile && <Button size='md' onClick={handleExit} disabled={pending} mt="16px" style={{ background: 'linear-gradient(180deg, rgba(0, 62, 120, 1) 0%, rgba(21, 139, 206, 0.6) 100%)', boxShadow: '0 4px 6px -4px #000' }}>CLAIM {'&'} WITHDRAW</Button>}
      <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog" style={{ position: 'absolute', right: isMobile ? '20px' : '190px', top: !isMobile && '20px' }}>
        <CloseIcon color="primary" style={{ fill: '#fff' }} />
      </IconButton>
    </StyledModal>
  )
}

export default FarmModal