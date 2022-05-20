import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { AddIcon, Button, IconButton, MinusIcon, Text, useModal } from 'uikit'
import { useUnstakeInterstellar } from 'hooks/useUnstake'
import { useStakeInterstellar } from 'hooks/useStake'
import BigNumber from 'bignumber.js'
import { useHarvestInterstellar } from 'hooks/useHarvest'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import DepositModal from 'views/components/DepositModal'
import WithdrawModal from 'views/components/WithdrawModal'
import { getContract } from 'utils/erc20'
import { useApproveInterstellar } from 'hooks/useApprove'
import { InterstellarWithStakedValue } from './InterstellarCard'

const Cards = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 66%;
  margin-top: 1em;
  gap: 8px;

  @media (max-width: 1080px) {
    width: 90%;
  }
`

const TokenCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 16px;
  background-color: #F2F2F2;
  border-radius: 8px;
  box-shadow: 0 6px 10px -4px #646464;
  max-width: 40%;
  
  @media (max-width: 1080px) {
    border-radius: 24px;
    padding: 32px 16px;
  }
`

const Image = styled.img`
  max-width: 80px;
`

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

interface Props {
  interstellar: InterstellarWithStakedValue
  onDismiss?: () => void
  isMobile: boolean
}

const TokenCardsInterstellar: React.FC<Props> = ({ interstellar, onDismiss, isMobile }) => {
  const [pending, setPending] = useState(false)
  const [requestedApproval, setRequestedApproval] = useState(false)

  const { userData, contractAddress, stakeTokenSymbol, rewardTokenSymbol, stakeTokenPrice, rewardTokenPrice, stakedTokenDecimals, stakeTokenAddress, } = interstellar

  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()

  const { onStakeInterstellar } = useStakeInterstellar(contractAddress)
  const { onUnstakeInterstellar } = useUnstakeInterstellar(contractAddress)
  const { onRewardInterstellar } = useHarvestInterstellar(contractAddress)

  const rewardEarned = userData?.earnings ? new BigNumber(userData?.earnings).div(1e18) : new BigNumber(0)
  const rewardEarnedUsd = userData?.earnings ? rewardEarned.times(rewardTokenPrice) : new BigNumber(0)

  const userBalance = new BigNumber(userData?.tokenBalance)

  const tokenStaked = userData?.stakedBalance ? new BigNumber(userData?.stakedBalance).div(new BigNumber(10).pow(stakedTokenDecimals)) : new BigNumber(0)
  const tokenStakedUsd = userData?.stakedBalance ? tokenStaked.times(stakeTokenPrice) : new BigNumber(0)

  const tokenStakedFormatted = tokenStaked.toFormat(2)
  const tokenStakedUsdFormatted = tokenStakedUsd.toFormat(2)

  const isApproved = new BigNumber(userData?.allowance).isGreaterThan(0)
  const isStaked = new BigNumber(userData?.stakedBalance).isGreaterThan(0)
  const canHarvest = new BigNumber(userData?.earnings).isGreaterThan(0)

  const tokenContract = useMemo(() => {
    return getContract(ethereum as provider, stakeTokenAddress)
  }, [ethereum, stakeTokenAddress])

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, contractAddress)
  }, [ethereum, contractAddress])

  const { onApprove } = useApproveInterstellar(tokenContract, lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
    } catch (e) {
      console.error(e)
    }
    finally {
      setRequestedApproval(false)
      onDismiss()
    }
  }, [onDismiss, onApprove])

  const handleClaimReward = async () => {
    setPending(true)
    try {
      onRewardInterstellar()
    }
    finally {
      setPending(false)
    }
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={userBalance}
      decimals={stakedTokenDecimals}
      onConfirm={onStakeInterstellar}
      tokenName={stakeTokenSymbol}
      depositFeeBP={0}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={tokenStaked.times(new BigNumber(10).pow(stakedTokenDecimals))} decimals={stakedTokenDecimals} onConfirm={onUnstakeInterstellar} tokenName={stakeTokenSymbol} />,
  )

  const renderStakingButtons = () => {
    return !isStaked ? (
      <Button size='sm' mt="16px" onClick={onPresentDeposit}>Stake</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" />
        </IconButton>
        <IconButton variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" />
        </IconButton>
      </IconButtonWrapper>
    )
  }

  const renderApprovalOrStakeButton = () => {
    return isApproved ? renderStakingButtons() : (
      <Button mt="16px" size='sm' disabled={requestedApproval} onClick={handleApprove} style={{ fontSize: isMobile && '14px' }}>
        Approve Contract
      </Button>
    )
  }

  return (
    <Cards>
      <TokenCard>
        <Image src={`images/icons/${rewardTokenSymbol.toLowerCase()}.png`} />
        <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{rewardEarned.toFormat(3)}</Text>
        <Text color='#9D9D9D' fontSize='14px'>≈ ${rewardEarnedUsd.toFormat(2)}</Text>
        <Text color='#9D9D9D' fontSize='14px'>${rewardTokenSymbol} Earned</Text>
        <Button size='sm' disabled={!canHarvest || pending} onClick={handleClaimReward} mt="16px">{isMobile ? 'CLAIM' : 'CLAIM REWARD'}</Button>
      </TokenCard>
      <TokenCard>
        <Image src={`images/icons/${stakeTokenSymbol.toLowerCase()}.png`} />
        <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{tokenStakedFormatted}</Text>
        <Text color='#9D9D9D' fontSize='14px'>≈ ${tokenStakedUsdFormatted}</Text>
        <Text color='#9D9D9D' fontSize='14px'>{stakeTokenSymbol} Staked</Text>
        {!account ? <UnlockButton mt="16px" size='sm' /> : renderApprovalOrStakeButton()}
      </TokenCard>
    </Cards>
  )
}

export default TokenCardsInterstellar