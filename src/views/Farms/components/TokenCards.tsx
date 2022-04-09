import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { AddIcon, Button, IconButton, MinusIcon, Text, useModal } from 'uikit'
import { useUnstakeGenesisPools, useUnstakeRsharePools } from 'hooks/useUnstake'
import { useStakeGenesisPools, useStakeRsharePools } from 'hooks/useStake'
import { FarmWithStakedValue } from './LPCard'
import BigNumber from 'bignumber.js'
import { usePriceRavBusd } from 'state/hooks'
import { useHarvestGenesisPools, useHarvestRsharePools } from 'hooks/useHarvest'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import DepositModal from 'views/components/DepositModal'
import WithdrawModal from 'views/components/WithdrawModal'
import { getContract } from 'utils/erc20'
import { useApproveGenesisPools, useApproveRsharePools } from 'hooks/useApprove'

const Cards = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  width: 70%;
  margin-top: 2em;
`

const TokenCard = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #F2F2F2;
  border-radius: 8px;
  box-shadow: 0 8px 10px -4px #000;
  max-width: 40%;
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
}

const TokenCards: React.FC<Props> = ({ farm }) => {
  const [pending, setPending] = useState(false)
  const [requestedApproval, setRequestedApproval] = useState(false)

  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP, decimals, userData, tokenSymbol, quoteTokenSymbol, isGenesis, lpSymbol, tokenPriceVsQuote, quoteTokenDecimals } = farm

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]

  const ravPriceUsd = usePriceRavBusd()

  const { account, ethereum }: { account: string, ethereum: provider } = useWallet()

  const { onStakeRsharePools } = useStakeRsharePools(pid)
  const { onStakeGenesisPools } = useStakeGenesisPools(pid)

  const { onUnstakeRsharePools } = useUnstakeRsharePools(pid)
  const { onUnstakeGenesisPools } = useUnstakeGenesisPools(pid)

  const { onRewardRsharePools } = useHarvestRsharePools(pid)
  const { onRewardGenesisPools } = useHarvestGenesisPools(pid)

  const rewardEarned = new BigNumber(userData?.earnings).div(1e18)
  const rewardEarnedUsd = rewardEarned.times(ravPriceUsd)

  const userBalance = new BigNumber(userData?.tokenBalance)

  const rshareStaked = new BigNumber(userData?.stakedBalance).div(1e18)
  const rshareStakedUsd = new BigNumber(userData?.stakedBalance).div(1e18).times(new BigNumber(tokenPriceVsQuote).times(new BigNumber(10).pow(18 - quoteTokenDecimals)))

  const rshareStakedFormatted = rshareStaked.toFormat(4)
  const rshareStakedUsdFormatted = rshareStakedUsd.toFormat(4)

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

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      if (isGenesis) await onApproveGenesisPools()
      else await onApproveRsharePools()
    } catch (e) {
      console.error(e)
    }
    finally {
      setRequestedApproval(false)
    }
  }, [onApproveRsharePools, onApproveGenesisPools, isGenesis])

  const handleClaimReward = async () => {
    setPending(true)
    try {
      if (isGenesis) await onRewardGenesisPools()
      else await onRewardRsharePools()
    }
    finally {
      setPending(false)
    }
  }

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={userBalance}
      decimals={decimals}
      onConfirm={isGenesis ? onStakeGenesisPools : onStakeRsharePools}
      tokenName={lpSymbol.toUpperCase()}
      depositFeeBP={depositFeeBP}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={rshareStaked.times(1e18)} decimals={decimals} onConfirm={isGenesis ? onUnstakeGenesisPools : onUnstakeRsharePools} tokenName={lpSymbol.toUpperCase()} />,
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
      <Button mt="16px" size='sm' disabled={requestedApproval} onClick={handleApprove}>
        Approve Contract
      </Button>
    )
  }

  return (
    <Cards>
      <TokenCard>
        <Image src={`images/icons/${isGenesis ? 'rav' : 'rshare'}.png`} />
        <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{rewardEarned.toFormat(4)}</Text>
        <Text color='#9D9D9D' fontSize='14px'>≈ ${rewardEarnedUsd.toFormat(4)}</Text>
        <Text color='#9D9D9D' fontSize='14px'>RAV Earned</Text>
        <Button size='sm' disabled={!isStaked || pending} onClick={handleClaimReward} mt="16px">CLAIM REWARD</Button>
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