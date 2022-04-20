import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { AddIcon, Button, IconButton, MinusIcon, Text, useModal } from 'uikit'
import { useUnstakeGenesisPools, useUnstakeRavPools, useUnstakeRsharePools } from 'hooks/useUnstake'
import { useStakeGenesisPools, useStakeRavPools, useStakeRsharePools } from 'hooks/useStake'
import { FarmWithStakedValue } from './LPCard'
import BigNumber from 'bignumber.js'
import { usePriceRavBusd } from 'state/hooks'
import { useHarvestGenesisPools, useHarvestRavPools, useHarvestRsharePools } from 'hooks/useHarvest'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import DepositModal from 'views/components/DepositModal'
import WithdrawModal from 'views/components/WithdrawModal'
import { getContract } from 'utils/erc20'
import { useApproveGenesisPools, useApproveRavPools, useApproveRsharePools } from 'hooks/useApprove'

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
  farm: FarmWithStakedValue
  onDismiss?: () => void
  isMobile: boolean
}

const TokenCards: React.FC<Props> = ({ farm, onDismiss, isMobile }) => {
  const [pending, setPending] = useState(false)
  const [requestedApproval, setRequestedApproval] = useState(false)

  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP, decimals, userData, tokenSymbol, quoteTokenSymbol, isGenesis, isRavPool, lpSymbol, tokenPriceVsQuote, quoteTokenDecimals } = farm

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]

  const ravPriceUsd = usePriceRavBusd()

  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()

  const { onStakeRsharePools } = useStakeRsharePools(pid)
  const { onStakeGenesisPools } = useStakeGenesisPools(pid)
  const { onStakeRavPools } = useStakeRavPools(pid)

  const { onUnstakeRsharePools } = useUnstakeRsharePools(pid)
  const { onUnstakeGenesisPools } = useUnstakeGenesisPools(pid)
  const { onUnstakeRavPools } = useUnstakeRavPools(pid)

  const { onRewardRsharePools } = useHarvestRsharePools(pid)
  const { onRewardGenesisPools } = useHarvestGenesisPools(pid)
  const { onRewardRavPools } = useHarvestRavPools(pid)

  const rewardEarned = userData?.earnings ? new BigNumber(userData?.earnings).div(1e18) : new BigNumber(0)
  const rewardEarnedUsd = userData?.earnings ? rewardEarned.times(ravPriceUsd) : new BigNumber(0)

  const userBalance = new BigNumber(userData?.tokenBalance)

  const rshareStaked = userData?.stakedBalance ? new BigNumber(userData?.stakedBalance).div(new BigNumber(10).pow(decimals)) : new BigNumber(0)
  const rshareStakedUsd = userData?.stakedBalance ? rshareStaked.times(new BigNumber(tokenPriceVsQuote)) : new BigNumber(0)

  const rshareStakedFormatted = rshareStaked.toFormat(2)
  const rshareStakedUsdFormatted = rshareStakedUsd.toFormat(2)

  const isApproved = new BigNumber(userData?.allowance).isGreaterThan(0)
  const isStaked = new BigNumber(userData?.stakedBalance).isGreaterThan(0)

  const farmName = isTokenOnly
    ? `${tokenSymbol.toLowerCase()}`
    : `${tokenSymbol.toLowerCase()}-${quoteTokenSymbol.toLowerCase()}`

  const lpContract = useMemo(() => {
    if (isTokenOnly) {
      return getContract(ethereum as provider, tokenAddress)
    }
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, isTokenOnly, lpAddress, tokenAddress])

  const { onApproveRsharePools } = useApproveRsharePools(lpContract)
  const { onApproveGenesisPools } = useApproveGenesisPools(lpContract)
  const { onApproveRavPools } = useApproveRavPools(lpContract)

  const handleApprove = useCallback(async () => {
    /*     try {
          setRequestedApproval(true)
          if (isGenesis) await onApproveGenesisPools()
          else if (isRavPool) await onApproveRavPools()
          else await onApproveRsharePools()
        } catch (e) {
          console.error(e)
        }
        finally {
          setRequestedApproval(false)
          onDismiss()
        } */
  }, [onApproveRsharePools, onApproveGenesisPools, onApproveRavPools, onDismiss, isGenesis, isRavPool])

  const handleClaimReward = async () => {
    setPending(true)
    /*     try {
          if (isGenesis) await onRewardGenesisPools()
          else if (isRavPool) await onRewardRavPools()
          else await onRewardRsharePools()
        }
        finally {
          setPending(false)
        } */
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={userBalance}
      decimals={decimals}
      onConfirm={isGenesis ? onStakeGenesisPools : isRavPool ? onStakeRavPools : onStakeRsharePools}
      tokenName={lpSymbol.toUpperCase()}
      depositFeeBP={depositFeeBP}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={rshareStaked.times(new BigNumber(10).pow(decimals))} decimals={decimals} onConfirm={isGenesis ? onUnstakeGenesisPools : isRavPool ? onUnstakeRavPools : onUnstakeRsharePools} tokenName={lpSymbol.toUpperCase()} />,
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
      <Button mt="16px" size='sm' disabled/* ={requestedApproval} */ onClick={handleApprove} style={{ fontSize: isMobile && '14px' }}>
        Approve Contract
      </Button>
    )
  }

  return (
    <Cards>
      <TokenCard>
        <Image src={`images/icons/${(isGenesis || isRavPool) ? 'rav' : 'rshare'}.png`} />
        <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{rewardEarned.toFormat(2)}</Text>
        <Text color='#9D9D9D' fontSize='14px'>≈ ${rewardEarnedUsd.toFormat(2)}</Text>
        <Text color='#9D9D9D' fontSize='14px'>${(isGenesis || isRavPool) ? 'RAV' : 'RSHARE'} Earned</Text>
        <Button size='sm' disabled={!isStaked || pending} onClick={handleClaimReward} mt="16px">{isMobile ? 'CLAIM' : 'CLAIM REWARD'}</Button>
      </TokenCard>
      <TokenCard>
        <Image src={`images/icons/${farmName}.png`} style={{ maxWidth: !isTokenOnly && '128px' }} />
        <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{rshareStakedFormatted}</Text>
        <Text color='#9D9D9D' fontSize='14px'>≈ ${rshareStakedUsdFormatted}</Text>
        <Text color='#9D9D9D' fontSize='14px'>{farmName.toUpperCase()} Staked</Text>
        {!account ? <UnlockButton mt="16px" size='sm' /> : renderApprovalOrStakeButton()}
      </TokenCard>
    </Cards>
  )
}

export default TokenCards