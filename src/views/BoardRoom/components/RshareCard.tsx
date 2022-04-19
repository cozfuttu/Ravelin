import BigNumber from 'bignumber.js'
import { useApproveMasonry } from 'hooks/useApprove'
import React, { useCallback, useMemo, useState } from 'react'
import { provider } from 'web3-core'
import { usePriceRshareBusd } from 'state/hooks'
import { Masonry } from 'state/types'
import styled from 'styled-components'
import { Button, Text, useModal, IconButton, AddIcon, MinusIcon } from 'uikit'
import { getContract } from 'utils/erc20'
import UnlockButton from 'components/UnlockButton'
import HexCard from '../../components/HexCard'
import { getRshareAddress } from 'utils/addressHelpers'
import DepositModal from '../../components/DepositModal'
import WithdrawModal from '../../components/WithdrawModal'
import { useStakeMasonry } from 'hooks/useStake'
import { useUnstakeMasonry } from 'hooks/useUnstake'

const Image = styled.img`
  max-width: 64px;
`

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

interface CardProps {
  masonry: Masonry
  ethereum: provider
  account: string
}

const RshareCard: React.FC<CardProps> = ({ masonry, ethereum, account }) => {
  const { userData } = masonry
  const rshareAddress = getRshareAddress()
  const rsharePriceUsd = usePriceRshareBusd()

  const [requestedApproval, setRequestedApproval] = useState(false)

  const userBalance = new BigNumber(userData?.tokenBalance)

  const rshareStaked = userData ? new BigNumber(userData?.stakedBalance).div(1e18) : new BigNumber(0)
  const rshareStakedUsd = userData ? new BigNumber(userData?.stakedBalance).div(1e18).times(rsharePriceUsd) : new BigNumber(0)

  const rshareStakedFormatted = rshareStaked.toFormat(4)
  const rshareStakedUsdFormatted = rshareStakedUsd.toFormat(4)

  const isApproved = new BigNumber(userData?.allowance).isGreaterThan(0)
  const isStaked = new BigNumber(userData?.stakedBalance).isGreaterThan(0)

  const canWithdraw = userData?.canWithdraw && new BigNumber(userData?.stakedBalance).isGreaterThan(0)

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, rshareAddress)
  }, [ethereum, rshareAddress])

  const { onApprove } = useApproveMasonry(lpContract)
  const { onStake } = useStakeMasonry()
  const { onUnstake } = useUnstakeMasonry()

  const handleApprove = useCallback(async () => {
    /*     try {
          setRequestedApproval(true)
          await onApprove()
          setRequestedApproval(false)
        } catch (e) {
          console.error(e)
        } */
  }, [onApprove])

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={userBalance}
      decimals={masonry?.tshareDecimals}
      onConfirm={onStake}
      tokenName='RSHARE'
      depositFeeBP={0}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={rshareStaked} decimals={masonry?.tshareDecimals} onConfirm={onUnstake} tokenName='RSHARE' />,
  )

  const renderStakingButtons = () => {
    return !isStaked ? (
      <Button size='sm' mt='16px' onClick={onPresentDeposit}>Stake</Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} disabled={!canWithdraw} mr="6px">
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
      <Button mt="16px" size='sm' disabled /*={requestedApproval} */ onClick={handleApprove}>
        Approve Contract
      </Button>
    )
  }

  return (
    <HexCard>
      <Image src="images/icons/rshare.png" />
      <Text color='#4E4E4E' fontSize='32px' bold mb="8px">{rshareStakedFormatted}</Text>
      <Text color='#9D9D9D' fontSize='14px'>≈ ${rshareStakedUsdFormatted}</Text>
      <Text color='#9D9D9D' fontSize='14px'>RSHARE Staked</Text>
      {!account ? <UnlockButton mt="16px" size='sm' /> : renderApprovalOrStakeButton()}
    </HexCard>
  )
}

export default RshareCard