import React, { useState } from 'react'
import WidePage from 'components/layout/WidePage'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { Button, Text, useMatchBreakpoints } from 'uikit'
import BlueBack from 'views/Home/components/BlueBack'
import BlackBack from 'views/Home/components/BlackBack'
import NextEpochCard from './components/NextEpochCard'
import CurrentEpochCard from './components/CurrentEpochCard'
import APRCard from './components/APRCard'
import RavPriceCard from './components/RavPriceCard'
import TotalStakedCard from './components/TotalStakedCard'
import { useMasonry, useTreasury } from 'state/hooks'
import AttentionIcon from 'views/Home/components/AttentionIcon'
import RavCard from './components/RavCard'
import RshareCard from './components/RshareCard'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useExitMasonry } from 'hooks/useUnstake'
import WithdrawCard from './components/WithdrawCard'
import ClaimCard from './components/ClaimCard'
import BigNumber from 'bignumber.js'

const ImageContainer = styled.div`
  position: fixed;
  left: -10%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: -99;
`

const InfoCards = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media (max-width: 1080px) {
    gap: 16px;
  }
`

const TokenCards = styled.div`
  display: flex;
  align-items: center;
  margin: 2em auto;
  justify-content: center;
  width: 80%;

  @media (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
`

const ButtonCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const BoardRoom = () => {
  const masonry = useMasonry()
  const treasury = useTreasury()
  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()

  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  const { userData } = masonry

  const canClaimReward = userData?.canClaimReward
  const canWithdraw = userData?.canWithdraw

  const isStaked = new BigNumber(userData?.stakedBalance).isGreaterThan(0)

  const [pending, setPending] = useState(false)
  const { onExit } = useExitMasonry()

  console.log('treasury: ', treasury)

  const handleExit = async () => {
    setPending(true)
    try {
      await onExit()
    }
    finally {
      setPending(false)
    }
  }

  return (
    <WidePage>
      <ImageContainer>
        <BlueBack />
        <BlackBack />
      </ImageContainer>
      <Text color='#003E78' fontSize='32px' bold mt={isMobile && '8vh'}>BOARDROOM</Text>
      <Text color='#4E4E4E' fontSize='28px' bold mt='32px'>Earn RAV by staking RSHARE</Text>
      <InfoCards>
        <NextEpochCard nextEpochPoint={parseInt(masonry?.nextEpochPoint)} />
        <CurrentEpochCard epoch={masonry?.epoch} />
        <RavPriceCard RavTWAP={treasury?.twap} />
        <APRCard masonry={masonry} />
        <TotalStakedCard masonry={masonry} />
      </InfoCards>
      <Text color='#000000' fontSize='16px' mt='5%' style={{ textAlign: 'center' }}><span><AttentionIcon /></span>Staked RSHAREs can only be withdrawn after 6 epochs.</Text>
      <TokenCards>
        <RavCard masonry={masonry} />
        <RshareCard masonry={masonry} account={account} ethereum={ethereum} />
      </TokenCards>
      <TokenCards style={{ justifyContent: 'space-around', alignItems: !isMobile && 'stretch' }}>
        {!canClaimReward && isStaked && <ClaimCard masonry={masonry} period={treasury?.period} />}
        {!canWithdraw && isStaked && <WithdrawCard masonry={masonry} period={treasury?.period} />}
      </TokenCards>
      <ButtonCont>
        <Button size='md' onClick={handleExit} disabled={pending || !canClaimReward || !canWithdraw}>CLAIM AND WITHDRAW</Button>
      </ButtonCont>
    </WidePage>
  )
}

export default BoardRoom